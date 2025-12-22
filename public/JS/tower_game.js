const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events,
      Vector = Matter.Vector;

// --- CẤU HÌNH GAME ---
const CONF = {
    nodeRadius: 12,
    linkThickness: 6,
    maxLinkLength: levelConfig.connectDistance, 
    
    // Cấu hình Sức bền vật liệu (Độ khó cao)
    linkStiffness: 0.65,     // Độ cứng thấp (0.65) -> Có độ đàn hồi, dễ rung lắc
    breakThreshold: 0.0025,  // Giới hạn gãy thấp (2.5%) -> Rất dễ sập nếu xây ẩu
    
    colors: {
        node: '#95a5a6',
        anchor: '#34495e',
        link: '#5d4037',      // Màu gỗ/sắt
        linkStressed: '#e74c3c', // Màu đỏ khi sắp gãy
        target: '#ecf0f1',
        ground: '#27ae60',
        previewLine: 'rgba(46, 204, 113, 0.6)'
    }
};

let engine, world, render, runner;
let nodes = []; 
let targetSensors = []; // Mảng chứa các mục tiêu
let isWon = false;
let isLost = false;
let remainingNodes = parseInt(document.getElementById('remaining-nodes').innerText);

// Biến điều khiển thao tác chuột
let isDraggingFromUI = false;
let isDraggingLooseNode = false;
let draggedBody = null;
let currentDragPos = { x: 0, y: 0 }; 

const ghostNode = document.getElementById('drag-ghost');
const nodeSource = document.getElementById('node-source');
const container = document.getElementById('physics-container');

// Khởi chạy
document.addEventListener("DOMContentLoaded", initGame);
document.getElementById('reset-btn').addEventListener('click', () => window.location.reload());

function initGame() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Setup Engine
    engine = Engine.create();
    world = engine.world;
    engine.positionIterations = 10;
    engine.velocityIterations = 10;

    // 2. Setup Render
    render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: width, height: height,
            wireframes: false, background: 'transparent', showAngleIndicator: false
        }
    });

    // 3. TẠO MẶT ĐẤT
    const ground = Bodies.rectangle(width / 2, height + 30, width, 100, { 
        isStatic: true, render: { fillStyle: CONF.colors.ground }
    });
    Composite.add(world, ground);

    // 4. TẠO CÁC MỤC TIÊU (Hỗ trợ nhiều mục tiêu cho Màn 2)
    // Ưu tiên dùng mảng 'targets', nếu không có thì dùng 'targetPos' cũ
    const targetsData = levelConfig.targets || [levelConfig.targetPos];

    targetsData.forEach(pos => {
        const sensor = Bodies.circle(pos.x, pos.y, 25, {
            isStatic: true, 
            isSensor: true, // Vật thể đi xuyên qua được
            render: { fillStyle: CONF.colors.target, strokeStyle: '#f1c40f', lineWidth: 4 }
        });
        sensor.isHit = false; // Trạng thái chưa chạm
        targetSensors.push(sensor);
        Composite.add(world, sensor);
    });

    // 5. TẠO ĐIỂM NEO (MÓNG)
    levelConfig.anchors.forEach(pos => createNode(pos.x, pos.y, true));

    // 6. ĐIỀU KHIỂN CHUỘT (Mouse Constraint)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // --- LOGIC CHUỘT: Kéo node cũ ---
    Events.on(mouseConstraint, 'startdrag', function(event) {
        if (isWon || isLost) return;
        const body = event.body;
        // Chỉ cho kéo nếu là Node
        if (nodes.includes(body)) {
            // Nếu Node đã bị nối cứng hoặc là Móng -> KHÔNG CHO KÉO
            if (isNodeLinked(body) || body.isStatic) {
                event.source.constraint.bodyB = null; 
            } else {
                // Nếu Node còn tự do -> CHO PHÉP KÉO
                isDraggingLooseNode = true;
                draggedBody = body;
            }
        }
    });

    Events.on(mouseConstraint, 'enddrag', function(event) {
        if (isDraggingLooseNode && draggedBody) {
            tryConnectNode(draggedBody); // Thả ra thì thử nối
            isDraggingLooseNode = false;
            draggedBody = null;
        }
    });

    Events.on(mouseConstraint, 'mousemove', function(event) {
        currentDragPos.x = event.mouse.position.x;
        currentDragPos.y = event.mouse.position.y;
    });

    // --- LOGIC UI: Kéo từ thanh công cụ ---
    setupUIDragLogic();

    // --- VÒNG LẶP GAME ---
    // Kiểm tra sức bền (gãy tháp) mỗi khung hình vật lý
    Events.on(engine, 'beforeUpdate', checkStructuralIntegrity);
    // Vẽ đường dự báo (preview) sau khi render xong
    Events.on(render, 'afterRender', drawPreviewLinks);
    // Kiểm tra va chạm để tính thắng
    Events.on(engine, 'collisionStart', checkWin);

    // Chạy
    runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
}

// --- LOGIC SỨC BỀN & THUA CUỘC ---
function checkStructuralIntegrity() {
    if (isWon || isLost) return;

    const constraints = Composite.allConstraints(world);
    
    for (let i = 0; i < constraints.length; i++) {
        const c = constraints[i];
        if (c.label === "Mouse Constraint") continue;
        
        const bodyA = c.bodyA;
        const bodyB = c.bodyB;
        if (!bodyA || !bodyB) continue;

        // Tính độ giãn (Stress/Strain)
        const currentLength = Vector.magnitude(Vector.sub(bodyA.position, bodyB.position));
        const originalLength = c.length;
        const diff = currentLength - originalLength;
        const strain = diff / originalLength; 

        // 1. Cảnh báo màu đỏ
        if (strain > (CONF.breakThreshold * 0.4)) { 
            c.render.strokeStyle = CONF.colors.linkStressed;
            // Càng căng càng mỏng
            c.render.lineWidth = Math.max(2, CONF.linkThickness - (strain * 50)); 
        } else {
            c.render.strokeStyle = CONF.colors.link;
            c.render.lineWidth = CONF.linkThickness;
        }

        // 2. Gãy và Thua
        if (strain > CONF.breakThreshold) {
            Composite.remove(world, c); // Đứt thanh nối
            loseGame(); // Gọi hàm thua
            break; 
        }
    }
}

function loseGame() {
    if (isLost || isWon) return;
    isLost = true;
    
    // Đợi 1.5s cho tháp đổ rồi hiện thông báo
    setTimeout(() => {
        document.getElementById('lose-modal').style.display = 'flex';
    }, 1000);
}

// --- LOGIC THẮNG CUỘC (ĐA MỤC TIÊU) ---
function checkWin(event) {
    if (isWon || isLost) return;
    
    const pairs = event.pairs;
    
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        
        // Kiểm tra va chạm với TẤT CẢ các sensor
        targetSensors.forEach(sensor => {
            if ((pair.bodyA === sensor || pair.bodyB === sensor) && !sensor.isHit) {
                const other = pair.bodyA === sensor ? pair.bodyB : pair.bodyA;
                
                // Chỉ tính khi node chạm vào
                if (nodes.includes(other)) {
                    sensor.isHit = true;
                    sensor.render.fillStyle = "#2ecc71"; // Đổi màu xanh
                    
                    // Hiệu ứng "nảy" nhẹ báo hiệu đã ăn
                    Body.scale(sensor, 1.2, 1.2);
                    setTimeout(() => Body.scale(sensor, 1/1.2, 1/1.2), 200);
                }
            }
        });
    }

    // Kiểm tra xem TẤT CẢ mục tiêu đã bị chạm chưa
    const allHit = targetSensors.every(s => s.isHit);

    if (allHit) {
        isWon = true;
        Runner.stop(runner); // Dừng vật lý
        setTimeout(() => { 
            document.getElementById('result-modal').style.display = 'flex'; 
        }, 500);
    }
}

// --- CÁC HÀM HỖ TRỢ XÂY DỰNG ---

function isNodeLinked(node) {
    // Kiểm tra node có dính constraint nào không (trừ chuột)
    return world.constraints.some(c => c.label !== "Mouse Constraint" && (c.bodyA === node || c.bodyB === node));
}

function tryConnectNode(node) {
    // Thử nối với tất cả node khác trong phạm vi
    nodes.forEach(otherNode => {
        if (otherNode === node) return;
        const dist = Vector.magnitude(Vector.sub(node.position, otherNode.position));
        if (dist < CONF.maxLinkLength) {
            createLink(node, otherNode);
        }
    });
}

function createNode(x, y, isStatic) {
    const node = Bodies.circle(x, y, CONF.nodeRadius, {
        isStatic: isStatic,
        friction: 0.9,
        restitution: 0.1,
        density: isStatic ? 1 : 0.002, 
        collisionFilter: { group: 1 }, // Cho phép va chạm với nhau
        render: { fillStyle: isStatic ? CONF.colors.anchor : CONF.colors.node, strokeStyle: '#7f8c8d', lineWidth: 2 }
    });
    nodes.push(node);
    Composite.add(world, node);
    return node;
}

function createLink(nodeA, nodeB) {
    // Kiểm tra trùng lặp
    const exists = world.constraints.some(c => 
        (c.bodyA === nodeA && c.bodyB === nodeB) || (c.bodyA === nodeB && c.bodyB === nodeA)
    );
    if (exists) return;

    const currentDist = Vector.magnitude(Vector.sub(nodeA.position, nodeB.position));
    const link = Constraint.create({
        bodyA: nodeA, bodyB: nodeB,
        length: currentDist,
        stiffness: CONF.linkStiffness, 
        damping: 0.05,
        render: { visible: true, type: 'line', strokeStyle: CONF.colors.link, lineWidth: CONF.linkThickness }
    });
    Composite.add(world, link);
}

// --- LOGIC KÉO TỪ UI ---
function setupUIDragLogic() {
    nodeSource.addEventListener('mousedown', (e) => {
        if (remainingNodes <= 0 || isWon || isLost) return;
        isDraggingFromUI = true;
        ghostNode.style.display = 'block';
        updateGhostPosition(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingFromUI) {
            updateGhostPosition(e);
            const rect = render.canvas.getBoundingClientRect();
            currentDragPos.x = e.clientX - rect.left;
            currentDragPos.y = e.clientY - rect.top;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDraggingFromUI) {
            isDraggingFromUI = false;
            ghostNode.style.display = 'none';
            const rect = render.canvas.getBoundingClientRect();
            // Nếu thả trong vùng canvas
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spawnNodeAt(x, y);
            }
        }
    });
}

function updateGhostPosition(e) {
    ghostNode.style.left = (e.clientX - 15) + 'px';
    ghostNode.style.top = (e.clientY - 15) + 'px';
}

function spawnNodeAt(x, y) {
    if (remainingNodes <= 0) return;
    const newNode = createNode(x, y, false);
    remainingNodes--;
    document.getElementById('remaining-nodes').innerText = remainingNodes;
    tryConnectNode(newNode);
}

// --- VẼ ĐƯỜNG DỰ BÁO (PREVIEW) ---
function drawPreviewLinks() {
    if ((!isDraggingFromUI && !isDraggingLooseNode) || isWon || isLost) return;
    
    let sourcePos = currentDragPos; 
    if (isDraggingLooseNode && draggedBody) {
        sourcePos = draggedBody.position;
    }
    const ctx = render.context;
    
    nodes.forEach(node => {
        if (draggedBody && node === draggedBody) return;
        
        const dist = Vector.magnitude(Vector.sub(node.position, sourcePos));
        if (dist < CONF.maxLinkLength) {
            // Vẽ đường đứt nét
            ctx.beginPath();
            ctx.moveTo(sourcePos.x, sourcePos.y);
            ctx.lineTo(node.position.x, node.position.y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = CONF.colors.previewLine;
            ctx.setLineDash([10, 10]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Vẽ vòng tròn bắt dính
            ctx.beginPath();
            ctx.arc(node.position.x, node.position.y, CONF.nodeRadius + 5, 0, 2 * Math.PI);
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}