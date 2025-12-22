const usersData = [
    { 
        id: 1, 
        fullName: "Nguyễn Văn A", 
        email: "nguyenvana@example.com", 
        phone: "0912345678", 
        role: "teacher", 
        grade: "", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "15/03/2024",
        lastLogin: "20/03/2024",
        notes: "Giáo viên chủ nhiệm lớp 3A"
    },
    { 
        id: 2, 
        fullName: "Trần Thị B", 
        email: "tranthib@example.com", 
        phone: "0923456789", 
        role: "student", 
        grade: "3", 
        status: "active", 
        accountType: "premium", 
        registrationDate: "10/03/2024",
        lastLogin: "19/03/2024",
        notes: "Học sinh giỏi Toán"
    },
    { 
        id: 3, 
        fullName: "Lê Văn C", 
        email: "levanc@example.com", 
        phone: "0934567890", 
        role: "parent", 
        grade: "3", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "08/03/2024",
        lastLogin: "18/03/2024",
        notes: "Phụ huynh của học sinh lớp 3"
    },
    { 
        id: 4, 
        fullName: "Phạm Thị D", 
        email: "phamthid@example.com", 
        phone: "0945678901", 
        role: "student", 
        grade: "2", 
        status: "pending", 
        accountType: "standard", 
        registrationDate: "05/03/2024",
        lastLogin: null,
        notes: "Học sinh mới, chờ xác nhận"
    },
    { 
        id: 5, 
        fullName: "Hoàng Văn E", 
        email: "hoangvane@example.com", 
        phone: "0956789012", 
        role: "teacher", 
        grade: "", 
        status: "active", 
        accountType: "premium", 
        registrationDate: "03/03/2024",
        lastLogin: "17/03/2024",
        notes: "Giáo viên STEM chuyên môn cao"
    },
    { 
        id: 6, 
        fullName: "Vũ Thị F", 
        email: "vuthif@example.com", 
        phone: "0967890123", 
        role: "student", 
        grade: "4", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "28/02/2024",
        lastLogin: "16/03/2024",
        notes: "Học sinh năng khiếu Khoa học"
    },
    { 
        id: 7, 
        fullName: "Đặng Văn G", 
        email: "dangvang@example.com", 
        phone: "0978901234", 
        role: "admin", 
        grade: "", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "25/02/2024",
        lastLogin: "15/03/2024",
        notes: "Quản trị viên hệ thống"
    },
    { 
        id: 8, 
        fullName: "Bùi Thị H", 
        email: "buithih@example.com", 
        phone: "0989012345", 
        role: "parent", 
        grade: "1", 
        status: "active", 
        accountType: "premium", 
        registrationDate: "20/02/2024",
        lastLogin: "14/03/2024",
        notes: "Phụ huynh quan tâm đến giáo dục STEM"
    },
    { 
        id: 9, 
        fullName: "Đỗ Văn I", 
        email: "dovani@example.com", 
        phone: "0990123456", 
        role: "student", 
        grade: "5", 
        status: "inactive", 
        accountType: "standard", 
        registrationDate: "18/02/2024",
        lastLogin: "10/03/2024",
        notes: "Học sinh không còn sử dụng hệ thống"
    },
    { 
        id: 10, 
        fullName: "Ngô Thị K", 
        email: "ngothik@example.com", 
        phone: "0901234567", 
        role: "teacher", 
        grade: "", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "15/02/2024",
        lastLogin: "13/03/2024",
        notes: "Giáo viên môn Công nghệ"
    },
    { 
        id: 11, 
        fullName: "Mai Văn L", 
        email: "maivanl@example.com", 
        phone: "0919876543", 
        role: "student", 
        grade: "3", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "12/02/2024",
        lastLogin: "12/03/2024",
        notes: "Học sinh đam mê lập trình"
    },
    { 
        id: 12, 
        fullName: "Lý Thị M", 
        email: "lythim@example.com", 
        phone: "0928765432", 
        role: "parent", 
        grade: "2", 
        status: "active", 
        accountType: "standard", 
        registrationDate: "10/02/2024",
        lastLogin: "11/03/2024",
        notes: ""
    }
];

let currentFilter = "all";
let currentRoleFilter = "";
let currentStatusFilter = "";
let currentGradeFilter = "";
let currentSearch = "";
let currentPage = 1;
const itemsPerPage = 10;
let filteredUsers = [];
let currentEditingId = null;

const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const statusFilter = document.getElementById('statusFilter');
const gradeFilter = document.getElementById('gradeFilter');
const filterBadges = document.querySelectorAll('.filter-badge');
const clearFiltersBtn = document.getElementById('clearFilters');
const usersTableBody = document.getElementById('usersTableBody');
const emptyState = document.getElementById('emptyState');
const paginationInfo = document.getElementById('paginationInfo');
const paginationNumbers = document.getElementById('paginationNumbers');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const addUserBtn = document.getElementById('addUserBtn');
const exportBtn = document.getElementById('exportBtn');
const refreshBtn = document.getElementById('refreshBtn');
const usersCount = document.getElementById('usersCount');

const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const userFullName = document.getElementById('userFullName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userRole = document.getElementById('userRole');
const userGrade = document.getElementById('userGrade');
const gradeField = document.getElementById('gradeField');
const userStatus = document.getElementById('userStatus');
const userType = document.getElementById('userType');
const userNotes = document.getElementById('userNotes');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

function getRoleName(role) {
    switch(role) {
        case 'student': return 'Học sinh';
        case 'teacher': return 'Giáo viên';
        case 'parent': return 'Phụ huynh';
        case 'admin': return 'Quản trị viên';
        default: return '';
    }
}

function getRoleClass(role) {
    switch(role) {
        case 'student': return 'role-student';
        case 'teacher': return 'role-teacher';
        case 'parent': return 'role-parent';
        case 'admin': return 'role-admin';
        default: return '';
    }
}

function getStatusName(status) {
    switch(status) {
        case 'active': return 'Đang hoạt động';
        case 'inactive': return 'Không hoạt động';
        case 'pending': return 'Chờ xác nhận';
        default: return '';
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'active': return 'status-active';
        case 'inactive': return 'status-inactive';
        case 'pending': return 'status-pending';
        default: return '';
    }
}

function getAvatarClass(role) {
    switch(role) {
        case 'student': return 'student';
        case 'teacher': return 'teacher';
        case 'parent': return 'parent';
        case 'admin': return 'admin';
        default: return '';
    }
}

function getAvatarIcon(role) {
    switch(role) {
        case 'student': return 'fas fa-user-graduate';
        case 'teacher': return 'fas fa-chalkboard-teacher';
        case 'parent': return 'fas fa-user-friends';
        case 'admin': return 'fas fa-user-shield';
        default: return 'fas fa-user';
    }
}

function filterUsers() {
    filteredUsers = usersData.filter(user => {
        if (currentFilter !== 'all') {
            if (currentFilter === 'new') {
                const regDate = new Date(user.registrationDate.split('/').reverse().join('-'));
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                
                if (regDate < sevenDaysAgo) {
                    return false;
                }
            } else if (currentFilter === 'premium') {
                if (user.accountType !== 'premium') {
                    return false;
                }
            }
        }
        
        if (currentRoleFilter && user.role !== currentRoleFilter) {
            return false;
        }
        
        if (currentStatusFilter && user.status !== currentStatusFilter) {
            return false;
        }
        
        if (currentGradeFilter && user.grade !== currentGradeFilter) {
            return false;
        }
    
        if (currentSearch) {
            const searchTerm = currentSearch.toLowerCase();
            const fullName = user.fullName.toLowerCase();
            const email = user.email.toLowerCase();
            
            if (!fullName.includes(searchTerm) && !email.includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });
    
    usersCount.textContent = filteredUsers.length;
    
    renderTable();
}

function renderTable() {
    usersTableBody.innerHTML = '';
    
    if (filteredUsers.length === 0) {
        usersTableBody.parentElement.style.display = 'none';
        emptyState.style.display = 'block';
        
        paginationInfo.textContent = `Hiển thị 0-0 của 0 người dùng`;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = true;
        paginationNumbers.innerHTML = '';
        
        return;
    }
    
    usersTableBody.parentElement.style.display = 'table';
    emptyState.style.display = 'none';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    paginatedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        const globalIndex = startIndex + index + 1;
        
        row.innerHTML = `
            <td>${globalIndex}</td>
            <td>
                <div class="user-info">
                    <div class="user-avatar ${getAvatarClass(user.role)}">
                        <i class="${getAvatarIcon(user.role)}"></i>
                    </div>
                    <div class="user-details">
                        <div class="user-name">${user.fullName}</div>
                        <div class="user-email">${user.email}</div>
                        <div class="user-phone">
                            <i class="fas fa-phone"></i> ${user.phone || 'Chưa cập nhật'}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="role-badge ${getRoleClass(user.role)}">
                    ${getRoleName(user.role)}
                    ${user.accountType === 'premium' ? ' <i class="fas fa-crown premium-icon"></i>' : ''}
                </span>
            </td>
            <td>
                ${user.grade ? `<span class="grade-badge">Lớp ${user.grade}</span>` : '—'}
            </td>
            <td>
                <span class="status-badge ${getStatusClass(user.status)}">
                    ${getStatusName(user.status)}
                </span>
            </td>
            <td class="col-date">
                <i class="far fa-calendar-alt"></i> ${user.registrationDate}
            </td>
            <td class="col-actions">
                <div class="action-buttons">
                    <button class="action-btn edit-btn" title="Chỉnh sửa" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn status-btn" title="Đổi trạng thái" data-id="${user.id}">
                        <i class="fas fa-power-off"></i>
                    </button>
                    ${user.accountType === 'premium' ? 
                        `<button class="action-btn premium-btn" title="Premium" data-id="${user.id}">
                            <i class="fas fa-crown premium-icon"></i>
                        </button>` : 
                        `<button class="action-btn premium-btn" title="Nâng cấp Premium" data-id="${user.id}">
                            <i class="fas fa-crown"></i>
                        </button>`
                    }
                    <button class="action-btn delete-btn delete" title="Xóa" data-id="${user.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;
        
        usersTableBody.appendChild(row);
    });
    
    updatePagination();
    
    attachActionEvents();
}

function updatePagination() {
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
        renderTable();
        return;
    }
    
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} của ${totalItems} người dùng`;
    
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
            const userId = parseInt(this.getAttribute('data-id'));
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            toggleUserStatus(userId);
        });
    });
    
    document.querySelectorAll('.premium-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            togglePremium(userId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    currentEditingId = userId;
    modalTitle.textContent = 'Chỉnh sửa người dùng';
    
    userFullName.value = user.fullName;
    userEmail.value = user.email;
    userPhone.value = user.phone || '';
    userRole.value = user.role;
    userGrade.value = user.grade || '';
    userStatus.value = user.status;
    userType.value = user.accountType;
    userNotes.value = user.notes || '';
    
    toggleGradeField(user.role);

    userModal.classList.add('show');
}

function addNewUser() {
    currentEditingId = null;
    modalTitle.textContent = 'Thêm người dùng mới';
    
    userForm.reset();
    userStatus.value = 'active';
    userType.value = 'standard';
    
    userModal.classList.add('show');
}

function deleteUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}"?`)) {
        const index = usersData.findIndex(u => u.id === userId);
        if (index !== -1) {
            usersData.splice(index, 1);
            currentPage = 1;
            filterUsers();
            alert(`Đã xóa người dùng: ${user.fullName}`);
        }
    }
}

function toggleUserStatus(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    user.status = newStatus;
    
    filterUsers();
    alert(`Đã đổi trạng thái của "${user.fullName}" thành "${getStatusName(newStatus)}"`);
}

function togglePremium(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const newType = user.accountType === 'premium' ? 'standard' : 'premium';
    user.accountType = newType;
    
    filterUsers();
    alert(`Đã ${newType === 'premium' ? 'nâng cấp' : 'hạ cấp'} tài khoản "${user.fullName}" thành ${newType === 'premium' ? 'Premium' : 'Tiêu chuẩn'}`);
}

function toggleGradeField(role) {
    if (role === 'student' || role === 'parent') {
        gradeField.style.display = 'block';
    } else {
        gradeField.style.display = 'none';
    }
}

function saveUser(userData) {
    if (currentEditingId) {
        const index = usersData.findIndex(u => u.id === currentEditingId);
        if (index !== -1) {
            usersData[index] = {
                ...usersData[index],
                ...userData,
                id: currentEditingId
            };
            alert(`Đã cập nhật thông tin người dùng: ${userData.fullName}`);
        }
    } else {
        const newId = Math.max(...usersData.map(u => u.id)) + 1;
        const newUser = {
            ...userData,
            id: newId,
            registrationDate: new Date().toLocaleDateString('vi-VN'),
            lastLogin: null
        };
        usersData.push(newUser);
        alert(`Đã thêm người dùng mới: ${userData.fullName}`);
    }
    
    currentPage = 1;
    filterUsers();
    closeUserModal();
}

function closeUserModal() {
    userModal.classList.remove('show');
    userForm.reset();
    currentEditingId = null;
}

function resetFilters() {
    currentFilter = "all";
    currentRoleFilter = "";
    currentStatusFilter = "";
    currentGradeFilter = "";
    currentSearch = "";
    currentPage = 1;
    
    searchInput.value = "";
    roleFilter.value = "";
    statusFilter.value = "";
    gradeFilter.value = "";
    
    filterBadges.forEach(badge => {
        if (badge.getAttribute('data-filter') === 'all') {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    });
    
    filterUsers();
}

function exportToExcel() {
    alert('Chức năng xuất Excel sẽ được thực hiện.\n\nTrong thực tế, đây sẽ là API gọi đến server để tải file Excel về.');
}

function init() {
    filteredUsers = [...usersData];
    usersCount.textContent = filteredUsers.length;
    renderTable();
    
    searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        currentPage = 1;
        filterUsers();
    });
    
    roleFilter.addEventListener('change', function() {
        currentRoleFilter = this.value;
        currentPage = 1;
        filterUsers();
    });
    
    statusFilter.addEventListener('change', function() {
        currentStatusFilter = this.value;
        currentPage = 1;
        filterUsers();
    });
    
    gradeFilter.addEventListener('change', function() {
        currentGradeFilter = this.value;
        currentPage = 1;
        filterUsers();
    });
    
    filterBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBadges.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            currentPage = 1;
            filterUsers();
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
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    addUserBtn.addEventListener('click', addNewUser);
    
    exportBtn.addEventListener('click', exportToExcel);
    
    refreshBtn.addEventListener('click', function() {
        filterUsers();
        alert('Đã làm mới danh sách người dùng');
    });
    
    closeModal.addEventListener('click', closeUserModal);
    cancelBtn.addEventListener('click', closeUserModal);
    
    userModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeUserModal();
        }
    });
    
    userRole.addEventListener('change', function() {
        toggleGradeField(this.value);
    });
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            fullName: userFullName.value.trim(),
            email: userEmail.value.trim(),
            phone: userPhone.value.trim(),
            role: userRole.value,
            grade: userRole.value === 'student' || userRole.value === 'parent' ? userGrade.value : '',
            status: userStatus.value,
            accountType: userType.value,
            notes: userNotes.value.trim()
        };
        
        saveUser(userData);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && userModal.classList.contains('show')) {
            closeUserModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);