// Signin functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.querySelector('.form');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
                this.setAttribute('title', 'Ẩn mật khẩu');
            } else {
                targetInput.type = 'password';
                icon.className = 'fas fa-eye';
                this.setAttribute('title', 'Hiện mật khẩu');
            }
        });
    });
    
    // Form submission
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                // Focus on first error field
                const firstError = document.querySelector('.form-group.error input');
                if (firstError) {
                    firstError.focus();
                }
            } else {
                const submitBtn = this.querySelector('.btn-primary');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang xử lý...';
            }
        });
    }
    
    function validateForm() {
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value;
        
        let isValid = true;
        
        // Clear all errors first
        clearAllErrors();
        
        // Validate username
        if (username.length < 3) {
            showFieldError('username', 'Tên đăng nhập phải có ít nhất 3 ký tự');
            isValid = false;
        }
        
        // Validate password
        if (password.length < 1) {
            showFieldError('password', 'Vui lòng nhập mật khẩu');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement.parentElement; // Account for password container
        
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement.parentElement; // Account for password container
        
        if (formGroup.classList.contains('error')) {
            formGroup.classList.remove('error');
            const errorElement = formGroup.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }
    
    function clearAllErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
    
    // Real-time validation for better UX
    const usernameInput = document.getElementById('username');
    
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value.length > 0 && value.length < 3) {
                showFieldError('username', 'Tên đăng nhập phải có ít nhất 3 ký tự');
            } else {
                clearFieldError('username');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const value = this.value;
            if (value.length === 0) {
                showFieldError('password', 'Vui lòng nhập mật khẩu');
            } else {
                clearFieldError('password');
            }
        });
    }
});