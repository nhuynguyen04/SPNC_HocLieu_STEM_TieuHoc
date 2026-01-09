document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const passwordRequirements = document.querySelector('.password-requirements');
    
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
    
    if (passwordInput && passwordRequirements) {
        passwordInput.addEventListener('focus', function() {
            if (!areAllRequirementsMet(this.value)) {
                passwordRequirements.classList.add('show');
                passwordRequirements.classList.remove('hidden');
            }
        });
        
        passwordInput.addEventListener('blur', function() {
            if (!this.value || areAllRequirementsMet(this.value)) {
                passwordRequirements.classList.remove('show');
            }
        });
        
        passwordInput.addEventListener('input', function() {
            checkPasswordRequirements(this.value);
            validatePasswordMatch();
            
            if (areAllRequirementsMet(this.value)) {
                passwordRequirements.classList.add('hidden');
                passwordRequirements.classList.remove('show');
            } else if (this.value) {
                passwordRequirements.classList.add('show');
                passwordRequirements.classList.remove('hidden');
            } else {
                passwordRequirements.classList.remove('show');
            }
        });
    }
    
    function areAllRequirementsMet(password) {
        const requirements = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };
        
        return Object.values(requirements).every(requirement => requirement);
    }
    
    function checkPasswordRequirements(password) {
        const requirements = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };
        
        Object.keys(requirements).forEach(requirement => {
            const element = document.querySelector(`[data-requirement="${requirement}"]`);
            if (element) {
                if (requirements[requirement]) {
                    element.classList.add('valid');
                } else {
                    element.classList.remove('valid');
                }
            }
        });
    }
    
    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            showFieldError('confirm_password', 'Mật khẩu xác nhận không khớp');
            return false;
        } else {
            clearFieldError('confirm_password');
            return true;
        }
    }
    
    function validateForm() {
        const fullname = document.getElementById('fullname').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const agreeTerms = document.querySelector('input[name="agree_terms"]');
        
        let isValid = true;
        
        clearAllErrors();
        
        if (fullname.length < 2) {
            showFieldError('fullname', 'Họ tên phải có ít nhất 2 ký tự');
            isValid = false;
        }
        
        if (username.length < 3) {
            showFieldError('username', 'Tên đăng nhập phải có ít nhất 3 ký tự');
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showFieldError('username', 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            showFieldError('email', 'Email không hợp lệ');
            isValid = false;
        }
        
        if (password.length < 6) {
            showFieldError('password', 'Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        }
        
        if (!validatePasswordMatch()) {
            isValid = false;
        }
        
        if (!agreeTerms.checked) {
            showFormError('Vui lòng đồng ý với điều khoản sử dụng');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement.parentElement; 
        
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
        const formGroup = field.parentElement.parentElement; 
        
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
    
    function showFormError(message) {
        let errorAlert = document.querySelector('.alert.alert-error');
        if (!errorAlert) {
            errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';

            const alertIcon = document.createElement('i');
            alertIcon.className = 'fas fa-exclamation-triangle';

            const alertParagraph = document.createElement('p');
            errorAlert.appendChild(alertIcon);
            errorAlert.appendChild(alertParagraph);

            const form = document.querySelector('.form');
            form.parentNode.insertBefore(errorAlert, form);
        }

        errorAlert.querySelector('p').textContent = message;
    }

    function clearFormError() {
        const errorAlert = document.querySelector('.alert.alert-error');
        if (errorAlert) errorAlert.remove();
    }
    
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            switch (fieldId) {
                case 'fullname':
                    if (value.length > 0 && value.length < 2) {
                        showFieldError(fieldId, 'Họ tên phải có ít nhất 2 ký tự');
                    } else {
                        clearFieldError(fieldId);
                    }
                    break;
                    
                case 'username':
                    if (value.length > 0 && value.length < 3) {
                        showFieldError(fieldId, 'Tên đăng nhập phải có ít nhất 3 ký tự');
                    } else if (value.length > 0 && !/^[a-zA-Z0-9_]+$/.test(value)) {
                        showFieldError(fieldId, 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
                    } else {
                        clearFieldError(fieldId);
                    }
                    break;
                    
                case 'email':
                    if (value.length > 0 && !isValidEmail(value)) {
                        showFieldError(fieldId, 'Email không hợp lệ');
                    } else {
                        clearFieldError(fieldId);
                    }
                    break;
            }
        });
    });
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            validatePasswordMatch();
        });
    }

    // Clear form error when user checks the agree box
    const agreeCheckbox = document.querySelector('input[name="agree_terms"]');
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', function() {
            if (this.checked) clearFormError();
        });
    }

    // Intercept form submit to run validations
    const formEl = document.querySelector('.form');
    if (formEl) {
        formEl.addEventListener('submit', function(e) {
            clearAllErrors();
            clearFormError();
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
});
