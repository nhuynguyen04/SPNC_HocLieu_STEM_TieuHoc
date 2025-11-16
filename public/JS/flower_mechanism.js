const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

let petals = [];
let folded = false;

// TẠO HOA MẶC ĐỊNH
function drawDefaultFlower() {
    petals = [];
    const cx = 250, cy = 250, r = 140;

    for (let i = 0; i < 6; i++) {
        let angle = (Math.PI * 2 / 6) * i;
        petals.push({
            x: cx,
            y: cy,
            angle: angle,
            foldedAngle: angle + Math.PI / 2,
            isFolded: false
        });
    }

    renderFlower();
}

// VẼ HOA
function renderFlower() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = "#ff80d5";

        let endX = 250 + Math.cos(p.angle) * 150;
        let endY = 250 + Math.sin(p.angle) * 150;

        ctx.moveTo(250, 250);
        ctx.quadraticCurveTo(endX, endY, 250, 250);

        ctx.fill();
    });

    // Vẽ nhị hoa
    ctx.beginPath();
    ctx.fillStyle = "#ffeb3b";
    ctx.arc(250, 250, 40, 0, Math.PI * 2);
    ctx.fill();
}

// NHẤN GẤP CÁNH HOA
canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    petals.forEach(p => {
        let petalEndX = 250 + Math.cos(p.angle) * 150;
        let petalEndY = 250 + Math.sin(p.angle) * 150;

        let dist = Math.sqrt((mx - petalEndX) ** 2 + (my - petalEndY) ** 2);

        if (dist < 65) {
            p.isFolded = true;
            foldPetals();
        }
    });
});

// GẤP CÁNH HOA
function foldPetals() {
    petals.forEach(p => {
        if (!p.isFolded) return;

        let i = 0;
        let foldAnimation = setInterval(() => {
            p.angle += 0.05;
            i++;

            if (i >= 15) clearInterval(foldAnimation);

            renderFlower();
        }, 30);
    });

    setTimeout(unfoldFlower, 2000);
}

// HOA TỰ NỞ RA
function unfoldFlower() {
    petals.forEach(p => {
        let i = 0;
        let unFoldAnimation = setInterval(() => {

            if (p.angle > p.foldedAngle - Math.PI / 2) {
                p.angle -= 0.05;
            }
            i++;

            if (i >= 15) clearInterval(unFoldAnimation);

            renderFlower();
        }, 30);
    });
}

// VẼ TỰ DO
let drawing = false;
document.getElementById("drawBtn").addEventListener("click", () => {
    canvas.style.cursor = "crosshair";

    canvas.onmousedown = () => drawing = true;
    canvas.onmouseup = () => drawing = false;

    canvas.onmousemove = e => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 3, 3);
    };
});

// CHỌN HOA MẪU
document.getElementById("chooseBtn").addEventListener("click", () => {
    drawDefaultFlower();
});

// XÓA CANVAS
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, 500, 500);
    petals = [];
});
