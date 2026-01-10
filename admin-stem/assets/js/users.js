// Admin users management - server-backed
let usersData = [];
let currentSearch = "";
let currentPage = 1;
const itemsPerPage = 10;
let filteredUsers = [];
let currentEditingId = null;

const searchInput = document.getElementById('searchInput');
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
const userGrade = document.getElementById('userGrade');
const gradeField = document.getElementById('gradeField');
// userStatus removed from form
const userNotes = document.getElementById('userNotes');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// status helpers removed

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

async function fetchUsers() {
    try {
        const res = await fetch('api/users.php');
        const data = await res.json();
        if (data.success) {
            usersData = data.users.map(u => ({
                id: u.id,
                fullName: u.fullName,
                email: u.email,
                phone: u.phone,
                role: u.role || '',
                grade: u.grade || '',
                registrationDate: u.registrationDate || '',
                notes: u.notes || ''
            }));
            filteredUsers = [...usersData];
            usersCount && (usersCount.textContent = filteredUsers.length);
            currentPage = 1;
            renderTable();
        } else {
            alert('Lỗi khi tải danh sách người dùng: ' + (data.message || ''));
        }
    } catch (e) {
        console.error(e);
        alert('Lỗi mạng khi tải người dùng');
    }
}

function filterUsers() {
    const s = (currentSearch || '').trim().toLowerCase();
    if (!s) {
        filteredUsers = [...usersData];
    } else {
        filteredUsers = usersData.filter(user => {
            return (
                (user.fullName || '').toLowerCase().includes(s) ||
                (user.email || '').toLowerCase().includes(s) ||
                (user.phone || '').toLowerCase().includes(s) ||
                (user.grade || '').toLowerCase().includes(s) ||
                (user.notes || '').toLowerCase().includes(s)
            );
        });
    }

    usersCount && (usersCount.textContent = filteredUsers.length);
    renderTable();
}

function renderTable() {
    if (!usersTableBody) return;
    usersTableBody.innerHTML = '';

    if (filteredUsers.length === 0) {
        usersTableBody.parentElement.style.display = 'none';
        emptyState && (emptyState.style.display = 'block');
        paginationInfo && (paginationInfo.textContent = `Hiển thị 0-0 của 0 người dùng`);
        prevPageBtn && (prevPageBtn.disabled = true);
        nextPageBtn && (nextPageBtn.disabled = true);
        paginationNumbers && (paginationNumbers.innerHTML = '');
        return;
    }

    usersTableBody.parentElement.style.display = 'table';
    emptyState && (emptyState.style.display = 'none');

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    paginatedUsers.forEach((user, idx) => {
        const tr = document.createElement('tr');
        const globalIndex = startIndex + idx + 1;

        tr.innerHTML = `
            <td>${globalIndex}</td>
            <td>
                <div class="user-info">
                    <div class="user-avatar ${getAvatarClass(user.role)}">
                        <i class="${getAvatarIcon(user.role)}"></i>
                    </div>
                    <div class="user-details">
                        <div class="user-name">${user.fullName}</div>
                        <div class="user-email">${user.email}</div>
                        <div class="user-phone"><i class="fas fa-phone"></i> ${user.phone || 'Chưa cập nhật'}</div>
                    </div>
                </div>
            </td>
            <td>${user.grade ? `<span class="grade-badge">Lớp ${user.grade}</span>` : '—'}</td>
            <td class="col-notes">${user.notes ? user.notes : '—'}</td>
            <td class="col-date"><i class="far fa-calendar-alt"></i> ${user.registrationDate || '—'}</td>
            <td class="col-actions">
                <div class="action-buttons">
                    <button class="action-btn edit-btn" title="Chỉnh sửa" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn delete" title="Xóa" data-id="${user.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        usersTableBody.appendChild(tr);
    });

    updatePagination();
    attachActionEvents();
}

function updatePagination() {
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) { currentPage = totalPages; renderTable(); return; }

    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationInfo && (paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} của ${totalItems} người dùng`);

    prevPageBtn && (prevPageBtn.disabled = currentPage === 1);
    nextPageBtn && (nextPageBtn.disabled = currentPage === totalPages || totalPages === 0);

    if (!paginationNumbers) return;
    paginationNumbers.innerHTML = '';
    if (totalPages === 0) return;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('div');
        btn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', () => { currentPage = i; renderTable(); });
        paginationNumbers.appendChild(btn);
    }
}

function attachActionEvents() {
    document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        editUser(id);
    }));

    // status button removed per admin request

    document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        deleteUser(id);
    }));
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    currentEditingId = userId;
    modalTitle && (modalTitle.textContent = 'Chỉnh sửa người dùng');

    userFullName && (userFullName.value = user.fullName);
    userEmail && (userEmail.value = user.email);
    userPhone && (userPhone.value = user.phone || '');
    userGrade && (userGrade.value = user.grade || '');
    // userStatus removed
    userNotes && (userNotes.value = user.notes || '');

    userModal && userModal.classList.add('show');
}

function addNewUser() {
    currentEditingId = null;
    modalTitle && (modalTitle.textContent = 'Thêm người dùng mới');
    userForm && userForm.reset();
    // userStatus removed
    userModal && userModal.classList.add('show');
}

function deleteUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}"?`)) return;

    fetch('api/users.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: userId }) })
    .then(r => r.json()).then(res => {
        if (res.success) { fetchUsers(); alert('Đã xóa người dùng'); }
        else alert('Lỗi: ' + (res.message || 'Không thể xóa'));
    }).catch(() => alert('Lỗi mạng'));
}

// toggleUserStatus removed

function saveUser(userData) {
    const payload = { action: 'save', id: currentEditingId, ...userData };
    fetch('api/users.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    .then(r => r.json()).then(res => {
        if (res.success) { fetchUsers(); closeUserModal(); alert('Lưu người dùng thành công'); }
        else alert('Lỗi: ' + (res.message || 'Không thể lưu'));
    }).catch(() => alert('Lỗi mạng'));
}

function closeUserModal() { userModal && userModal.classList.remove('show'); userForm && userForm.reset(); currentEditingId = null; }

function resetFilters() {
    currentSearch = ""; currentPage = 1;
    if (searchInput) searchInput.value = '';
    filterUsers();
}

function exportToExcel() { alert('Chức năng xuất Excel sẽ được thực hiện.'); }
function exportToExcel() {
    try {
        const rows = filteredUsers.map(u => ({
            id: u.id,
            fullName: u.fullName,
            email: u.email,
            phone: u.phone || '',
            grade: u.grade || '',
            notes: u.notes || '',
            registrationDate: u.registrationDate || ''
        }));

        if (!rows.length) { alert('Không có dữ liệu để xuất'); return; }

        const header = ['ID','Họ và tên','Email','Số điện thoại','Khối/Lớp','Ghi chú','Ngày đăng ký'];
        const csv = [header.join(',')].concat(rows.map(r => [
            r.id,
            '"' + (r.fullName || '').replace(/"/g,'""') + '"',
            '"' + (r.email || '').replace(/"/g,'""') + '"',
            '"' + (r.phone || '').replace(/"/g,'""') + '"',
            '"' + (r.grade || '').replace(/"/g,'""') + '"',
            '"' + (r.notes || '').replace(/"/g,'""') + '"',
            '"' + (r.registrationDate || '').replace(/"/g,'""') + '"'
        ].join(',')).join('\n'));

        const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users_export_' + new Date().toISOString().slice(0,10) + '.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error(e);
        alert('Lỗi khi xuất dữ liệu');
    }
}

function init() {
    fetchUsers();

    if (searchInput) searchInput.addEventListener('input', function() { currentSearch = this.value; currentPage = 1; filterUsers(); });

    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetFilters);
    if (prevPageBtn) prevPageBtn.addEventListener('click', function() { if (currentPage > 1) { currentPage--; renderTable(); } });
    if (nextPageBtn) nextPageBtn.addEventListener('click', function() { const totalPages = Math.ceil(filteredUsers.length / itemsPerPage); if (currentPage < totalPages) { currentPage++; renderTable(); } });
    if (addUserBtn) addUserBtn.addEventListener('click', addNewUser);
    if (exportBtn) exportBtn.addEventListener('click', exportToExcel);
    if (refreshBtn) refreshBtn.addEventListener('click', function() { fetchUsers(); alert('Đã làm mới danh sách người dùng'); });
    if (closeModal) closeModal.addEventListener('click', closeUserModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeUserModal);
    if (userModal) userModal.addEventListener('click', function(e) { if (e.target === this) closeUserModal(); });

    if (userForm) userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = {
            fullName: userFullName ? userFullName.value.trim() : '',
            email: userEmail ? userEmail.value.trim() : '',
            phone: userPhone ? userPhone.value.trim() : '',
            grade: userGrade ? userGrade.value : '',
            notes: userNotes ? userNotes.value.trim() : ''
        };
        saveUser(data);
    });

    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && userModal && userModal.classList.contains('show')) closeUserModal(); });

    // No polling for online status
}

document.addEventListener('DOMContentLoaded', init);