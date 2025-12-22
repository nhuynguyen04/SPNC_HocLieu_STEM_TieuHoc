console.log('JS file loaded successfully');
const materialsData = [
    // Khoa học
    { id: 1, title: "Thế giới màu sắc", category: "science", grade: "1", type: "game", views: 2450, date: "15/03/2024", description: "Giúp học sinh tìm hiểu về pha màu cơ bản thông qua trò chơi tương tác." },
    { id: 2, title: "Bí kíp ăn uống lành mạnh", category: "science", grade: "3", type: "game", views: 3847, date: "10/03/2024", description: "Trò chơi xây dựng tháp dinh dưỡng, giúp học sinh hiểu về chế độ ăn uống lành mạnh." },
    { id: 3, title: "Ngày và đêm", category: "science", grade: "3", type: "qa", views: 1925, date: "05/03/2024", description: "Hệ thống câu hỏi giúp học sinh hiểu về hiện tượng ngày và đêm, sự quay của Trái Đất." },
    { id: 4, title: "Thùng rác thân thiện", category: "science", grade: "3", type: "game", views: 2310, date: "28/02/2024", description: "Trò chơi phân loại rác thải, giáo dục học sinh về bảo vệ môi trường." },
    { id: 5, title: "Các bộ phận của cây", category: "science", grade: "3", type: "game", views: 1780, date: "20/02/2024", description: "Trò chơi lắp ghép các bộ phận của cây, giúp học sinh nhận biết cấu tạo thực vật." },
    
    // Công nghệ
    { id: 6, title: "Cây gia đình", category: "tech", grade: "3", type: "game", views: 1950, date: "18/03/2024", description: "Xây dựng cây gia phả đơn giản, giúp học sinh hiểu về mối quan hệ gia đình." },
    { id: 7, title: "Em là họa sĩ máy tính", category: "tech", grade: "2", type: "game", views: 3421, date: "12/03/2024", description: "Công cụ vẽ tranh đơn giản và chia sẻ tác phẩm với bạn bè trong lớp." },
    { id: 8, title: "Em là người đánh máy", category: "tech", grade: "2", type: "game", views: 2150, date: "08/03/2024", description: "Trò chơi luyện gõ bàn phím với các bài tập từ đơn giản đến phức tạp." },
    { id: 9, title: "Sơn Tinh (lập trình khối)", category: "tech", grade: "3", type: "practice", views: 1850, date: "03/03/2024", description: "Giới thiệu lập trình Scratch thông qua câu chuyện Sơn Tinh - Thủy Tinh." },
    { id: 10, title: "Các bộ phận của máy tính", category: "tech", grade: "2", type: "game", views: 2025, date: "25/02/2024", description: "Trò chơi lắp ráp các bộ phận máy tính, giúp học sinh nhận biết các thành phần cơ bản." },
    
    // Kỹ thuật
    { id: 11, title: "Hoa yêu thương nở rộ", category: "eng", grade: "1", type: "mixed", views: 2539, date: "22/03/2024", description: "Kết hợp trò chơi lắp ráp và câu hỏi về cấu tạo hoa, quá trình phát triển thực vật." },
    { id: 12, title: "Xây cầu giấy", category: "eng", grade: "3", type: "game", views: 1680, date: "15/03/2024", description: "Thiết kế và xây dựng cầu từ giấy, học về nguyên lý cân bằng và chịu lực." },
    { id: 13, title: "Chế tạo xe bong bóng", category: "eng", grade: "4-5", type: "game", views: 2120, date: "10/03/2024", description: "Thiết kế xe chạy bằng lực đẩy của bong bóng, tìm hiểu về chuyển động và lực đẩy." },
    
    // Toán học
    { id: 14, title: "Hậu Nghệ bắn mặt trời", category: "math", grade: "4", type: "game", views: 3792, date: "20/03/2024", description: "Trò chơi tính toán góc bắn và lực, ứng dụng toán học trong câu chuyện Hậu Nghệ." },
    { id: 15, title: "Nhận biết hình học", category: "math", grade: "1", type: "game", views: 2450, date: "14/03/2024", description: "Trò chơi giúp học sinh nhận biết các hình học cơ bản: vuông, tròn, tam giác, chữ nhật." },
    { id: 16, title: "Tangram 3D", category: "math", grade: "5", type: "game", views: 1920, date: "08/03/2024", description: "Phiên bản 3D của trò chơi Tangram, phát triển tư duy không gian và hình học." },
    { id: 17, title: "Đếm số thông minh", category: "math", grade: "1", type: "game", views: 2680, date: "02/03/2024", description: "Trò chơi đếm số với hình ảnh sinh động, giúp học sinh làm quen với số đếm cơ bản." }
];

let currentFilter = "all";
let currentGradeFilter = "";
let currentTypeFilter = "";
let currentSearch = "";
let currentPage = 1;
const itemsPerPage = 10;
let filteredMaterials = [];

const searchInput = document.getElementById('searchInput');
const gradeFilter = document.getElementById('gradeFilter');
const typeFilter = document.getElementById('typeFilter');
const filterBadges = document.querySelectorAll('.filter-badge');
const clearFiltersBtn = document.getElementById('clearFilters');
const materialsTableBody = document.getElementById('materialsTableBody');
const emptyState = document.getElementById('emptyState');
const paginationInfo = document.getElementById('paginationInfo');
const paginationNumbers = document.getElementById('paginationNumbers');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const addMaterialBtn = document.getElementById('addMaterialBtn');

function getCategoryName(category) {
    switch(category) {
        case 'science': return 'Khoa học';
        case 'tech': return 'Công nghệ';
        case 'eng': return 'Kỹ thuật';
        case 'math': return 'Toán học';
        default: return '';
    }
}

function getTypeName(type) {
    switch(type) {
        case 'game': return 'Trò chơi';
        case 'qa': return 'Trả lời câu hỏi';
        case 'practice': return 'Thực hành';
        case 'mixed': return 'Hỗn hợp';
        default: return '';
    }
}

function getCategoryBadgeClass(category) {
    switch(category) {
        case 'science': return 'science-badge';
        case 'tech': return 'tech-badge';
        case 'eng': return 'eng-badge';
        case 'math': return 'math-badge';
        default: return '';
    }
}

function getTypeBadgeClass(type) {
    switch(type) {
        case 'game': return 'type-game';
        case 'qa': return 'type-qa';
        case 'practice': return 'type-practice';
        case 'mixed': return 'type-mixed';
        default: return '';
    }
}

function formatViews(views) {
    return views.toLocaleString('vi-VN');
}

function filterMaterials() {
    filteredMaterials = materialsData.filter(material => {
        if (currentFilter !== 'all' && material.category !== currentFilter) {
            return false;
        }
        
        if (currentGradeFilter) {
            if (material.grade.includes('-')) {
                const [start, end] = material.grade.split('-').map(Number);
                const filterGrade = parseInt(currentGradeFilter);
                if (filterGrade < start || filterGrade > end) {
                    return false;
                }
            } else if (material.grade !== currentGradeFilter) {
                return false;
            }
        }
        
        if (currentTypeFilter && material.type !== currentTypeFilter) {
            return false;
        }
        
        if (currentSearch) {
            const searchTerm = currentSearch.toLowerCase();
            const title = material.title.toLowerCase();
            const description = material.description.toLowerCase();
            const categoryName = getCategoryName(material.category).toLowerCase();
            
            if (!title.includes(searchTerm) && 
                !description.includes(searchTerm) && 
                !categoryName.includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });
    
    renderTable();
}

function renderTable() {
    console.log('renderTable called');
    materialsTableBody.innerHTML = '';
    
    if (filteredMaterials.length === 0) {
        const tableElement = materialsTableBody.closest('table');
        if (tableElement) {
            tableElement.style.display = 'none';
        }
        emptyState.style.display = 'block';
        
        paginationInfo.textContent = `Hiển thị 0-0 của 0 học liệu`;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = true;
        paginationNumbers.innerHTML = '';
        
        return;
    }
    
    const tableElement = materialsTableBody.closest('table');
    if (tableElement) {
        tableElement.style.display = 'table';
    }
    emptyState.style.display = 'none';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);
    
    paginatedMaterials.forEach((material, index) => {
        const globalIndex = startIndex + index + 1;
        
        const rowHTML = `
            <tr>
                <td>${globalIndex}</td>
                <td class="col-title">${material.title}</td>
                <td class="col-category">
                    <span class="category-badge ${getCategoryBadgeClass(material.category)}">
                        ${getCategoryName(material.category)}
                    </span>
                </td>
                <td class="col-grade">
                    <span class="grade-badge">${material.grade}</span>
                </td>
                <td class="col-type">
                    <span class="type-badge ${getTypeBadgeClass(material.type)}">
                        ${getTypeName(material.type)}
                    </span>
                </td>
                <td class="col-views">
                    <i class="fas fa-eye"></i> ${formatViews(material.views)}
                </td>
                <td class="col-actions">
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" title="Chỉnh sửa" data-id="${material.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn preview-btn" title="Xem trước" data-id="${material.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn delete-btn delete" title="Xóa" data-id="${material.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        
        materialsTableBody.insertAdjacentHTML('beforeend', rowHTML);
    });
    
    console.log('Rows added, tbody children:', materialsTableBody.children.length);
    console.log('tbody innerHTML length:', materialsTableBody.innerHTML.length);
    
    updatePagination();
    
    attachActionEvents();
}

function updatePagination() {
    const totalItems = filteredMaterials.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
        renderTable();
        return;
    }
    
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} của ${totalItems} học liệu`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    paginationNumbers.innerHTML = '';
    
    if (totalPages === 0) {
        return;
    }
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        paginationNumbers.appendChild(pageBtn);
    }
}

function attachActionEvents() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const materialId = this.getAttribute('data-id');
            const material = materialsData.find(m => m.id == materialId);
            alert(`Chỉnh sửa học liệu: "${material.title}"\n\nChức năng này sẽ mở form chỉnh sửa học liệu.`);
        });
    });
    
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const materialId = this.getAttribute('data-id');
            const material = materialsData.find(m => m.id == materialId);
            alert(`Xem trước học liệu: "${material.title}"\n\nChức năng này sẽ mở cửa sổ xem trước học liệu.`);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const materialId = this.getAttribute('data-id');
            const material = materialsData.find(m => m.id == materialId);
            
            if (confirm(`Bạn có chắc chắn muốn xóa học liệu "${material.title}"?`)) {
                const index = materialsData.findIndex(m => m.id == materialId);
                if (index !== -1) {
                    materialsData.splice(index, 1);
                    currentPage = 1;
                    filterMaterials();
                    alert(`Đã xóa học liệu: ${material.title}`);
                }
            }
        });
    });
}

function resetFilters() {
    currentFilter = "all";
    currentGradeFilter = "";
    currentTypeFilter = "";
    currentSearch = "";
    currentPage = 1;
    
    searchInput.value = "";
    gradeFilter.value = "";
    typeFilter.value = "";
    
    filterBadges.forEach(badge => {
        if (badge.getAttribute('data-filter') === 'all') {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    });
    
    filterMaterials();
}

function init() {
    console.log('init function called');
    filteredMaterials = [...materialsData];
    console.log('filteredMaterials length:', filteredMaterials.length);
    renderTable();
    
    searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        currentPage = 1;
        filterMaterials();
    });
    
    gradeFilter.addEventListener('change', function() {
        currentGradeFilter = this.value;
        currentPage = 1;
        filterMaterials();
    });
    
    typeFilter.addEventListener('change', function() {
        currentTypeFilter = this.value;
        currentPage = 1;
        filterMaterials();
    });
    
    filterBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBadges.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            currentPage = 1;
            filterMaterials();
        });
    });
    
    clearFiltersBtn.addEventListener('click', resetFilters);
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    addMaterialBtn.addEventListener('click', function() {
        alert('Chức năng thêm học liệu mới sẽ được mở ra.\n\nTrong thực tế, đây sẽ là một form thêm học liệu với các trường: tên, chuyên đề, khối lớp, loại học liệu, mô tả, v.v.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    console.log('materialsTableBody:', materialsTableBody);
    console.log('materialsData length:', materialsData.length);
    init();
});