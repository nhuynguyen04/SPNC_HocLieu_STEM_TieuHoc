document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
           
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    const editProfileBtn = document.getElementById('editProfileBtn');
    const editAvatarBtn = document.getElementById('editAvatarBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const editAvatarModal = document.getElementById('editAvatarModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const closeAvatarModal = document.getElementById('closeAvatarModal');
    const cancelProfileEdit = document.getElementById('cancelProfileEdit');
    const cancelAvatarEdit = document.getElementById('cancelAvatarEdit');
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const saveAvatarBtn = document.getElementById('saveAvatarBtn');
    const profileForm = document.getElementById('profileForm');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            editProfileModal.classList.add('active');
        });
    }

    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', () => {
            editAvatarModal.classList.add('active');
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => {
            editProfileModal.classList.remove('active');
        });
    }

    if (closeAvatarModal) {
        closeAvatarModal.addEventListener('click', () => {
            editAvatarModal.classList.remove('active');
        });
    }

    if (cancelProfileEdit) {
        cancelProfileEdit.addEventListener('click', () => {
            editProfileModal.classList.remove('active');
        });
    }

    if (cancelAvatarEdit) {
        cancelAvatarEdit.addEventListener('click', () => {
            editAvatarModal.classList.remove('active');
        });
    }

    if (uploadAvatarBtn) {
        uploadAvatarBtn.addEventListener('click', () => {
            avatarInput.click();
        });
    }

    let selectedAvatarFile = null;

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                selectedAvatarFile = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatarPreview = document.getElementById('avatarPreview');
                    avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Avatar preview">`;
                };
                reader.readAsDataURL(selectedAvatarFile);
            }
        });
    }

    if (saveAvatarBtn) {
        saveAvatarBtn.addEventListener('click', () => {
            if (selectedAvatarFile) {
                const currentAvatar = document.getElementById('currentAvatar');
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentAvatar.innerHTML = `<img src="${event.target.result}" alt="User avatar">`;
                };
                reader.readAsDataURL(selectedAvatarFile);
                
                alert('Ảnh đại diện đã được cập nhật!');
                editAvatarModal.classList.remove('active');
                selectedAvatarFile = null;
            } else {
                alert('Vui lòng chọn ảnh trước khi lưu!');
            }
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const birthDate = document.getElementById('birthDate').value;
            const studentClass = document.getElementById('class').value;
            const school = document.getElementById('school').value;
            
            const formattedDate = formatDateForDisplay(birthDate);
            
            document.getElementById('displayName').textContent = fullName;
            document.getElementById('infoFullName').textContent = fullName;
            document.getElementById('infoBirthDate').textContent = formattedDate;
            document.getElementById('infoClass').textContent = studentClass;
            document.getElementById('infoSchool').textContent = school;
            
            alert('Thông tin hồ sơ đã được cập nhật!');
            editProfileModal.classList.remove('active');
        });
    }

    function formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function initializeCircularProgress() {
        const circularProgress = document.querySelector('.circular-progress');
        if (circularProgress) {
            const progress = circularProgress.getAttribute('data-progress');
            const degrees = (progress / 100) * 360;
            
            setTimeout(() => {
                circularProgress.style.background = `conic-gradient(#667eea ${degrees}deg, #e2e8f0 0deg)`;
            }, 500);
        }
    }

    window.addEventListener('click', (e) => {
        if (e.target === editProfileModal) {
            editProfileModal.classList.remove('active');
        }
        if (e.target === editAvatarModal) {
            editAvatarModal.classList.remove('active');
        }
    });

    initializeCircularProgress();
});