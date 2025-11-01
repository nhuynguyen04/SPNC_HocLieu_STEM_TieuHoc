document.addEventListener('DOMContentLoaded', function() {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    const logoutBtn = document.getElementById('logoutBtn');

    console.log('✅ User menu loaded');

    userAvatar.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
        dropdownOverlay.classList.toggle('show');
        console.log('🎯 Dropdown toggled');
    });

    dropdownOverlay.addEventListener('click', function() {
        userDropdown.classList.remove('show');
        dropdownOverlay.classList.remove('show');
    });

    document.addEventListener('click', function(e) {
        if (!userDropdown.contains(e.target) && !userAvatar.contains(e.target)) {
            userDropdown.classList.remove('show');
            dropdownOverlay.classList.remove('show');
        }
    });

    window.addEventListener('scroll', function() {
        userDropdown.classList.remove('show');
        dropdownOverlay.classList.remove('show');
    });

    logoutBtn.addEventListener('click', function() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            window.location.href = '../../logout.php';
        }
    });
});