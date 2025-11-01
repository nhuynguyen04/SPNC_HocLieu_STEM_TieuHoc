document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const infoAlert = document.getElementById('infoAlert');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const emailError = document.getElementById('emailError');

    function showAlert(alertElement, message = '') {

        hideAllAlerts();
        
        if (message) {
            const messageElement = alertElement.querySelector('p');
            if (messageElement) {
                messageElement.textContent = message;
            }
        }
        
        alertElement.style.display = 'flex';
        alertElement.style.animation = 'alertSlideIn 0.3s ease';
    }

    function hideAllAlerts() {
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
        infoAlert.style.display = 'none';
    }

    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        if (emailError) {
            emailError.textContent = message;
        }
        
        input.focus();
    }
    function clearFieldError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        if (emailError) {
            emailError.textContent = '';
        }
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    emailInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showFieldError(this, 'Vui lòng nhập email');
        } else if (!isValidEmail(this.value.trim())) {
            showFieldError(this, 'Email không hợp lệ');
        } else {
            clearFieldError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.trim() && isValidEmail(this.value.trim())) {
            clearFieldError(this);
        }
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        hideAllAlerts();
        clearFieldError(emailInput);
        
        let isValid = true;
        
        if (!emailInput.value.trim()) {
            showFieldError(emailInput, 'Vui lòng nhập email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showFieldError(emailInput, 'Email không hợp lệ');
            isValid = false;
        }
        
        if (!isValid) {
            showAlert(errorAlert, 'Vui lòng kiểm tra thông tin đã nhập');
            return;
        }
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang xử lý...';

        try {
            await simulateAPICall(emailInput.value.trim());
            
            showAlert(successAlert, 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!');
            showAlert(infoAlert);
            
            form.reset();
            
            startCountdown();
            
        } catch (error) {
            showAlert(errorAlert, error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi liên kết đặt lại';
        }
    });

    function simulateAPICall(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = Math.random() > 0.3;
                
                if (isSuccess) {
                    resolve({ success: true, message: 'Email sent successfully' });
                } else {
                    reject(new Error('Không tìm thấy tài khoản với email này'));
                }
            }, 2000);
        });
    }

    function startCountdown() {
        const authFooter = document.querySelector('.auth-footer');
        let existingCountdown = document.querySelector('.countdown');
        
        if (existingCountdown) {
            existingCountdown.remove();
        }
        
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown';
        countdownElement.innerHTML = 'Bạn có thể gửi lại yêu cầu sau <span class="countdown-number">60</span> giây';
        
        authFooter.appendChild(countdownElement);
        
        let countdown = 60;
        const countdownNumber = countdownElement.querySelector('.countdown-number');
        
        const timer = setInterval(() => {
            countdown--;
            countdownNumber.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(timer);
                countdownElement.remove();
            }
        }, 1000);
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });

    setTimeout(() => {
        document.querySelectorAll('.form-group').forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});