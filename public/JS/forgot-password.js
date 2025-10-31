document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const infoAlert = document.getElementById('infoAlert');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const emailError = document.getElementById('emailError');

    // Show alert function
    function showAlert(alertElement, message = '') {
        // Hide all alerts first
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

    // Hide all alerts
    function hideAllAlerts() {
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
        infoAlert.style.display = 'none';
    }

    // Show error for specific field
    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        if (emailError) {
            emailError.textContent = message;
        }
        
        input.focus();
    }

    // Clear field error
    function clearFieldError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        if (emailError) {
            emailError.textContent = '';
        }
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation
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

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        hideAllAlerts();
        clearFieldError(emailInput);
        
        // Validate form
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

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang xử lý...';

        try {
            // Simulate API call - Replace with actual API call
            await simulateAPICall(emailInput.value.trim());
            
            // Show success message
            showAlert(successAlert, 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!');
            showAlert(infoAlert);
            
            // Reset form
            form.reset();
            
            // Add countdown timer
            startCountdown();
            
        } catch (error) {
            showAlert(errorAlert, error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi liên kết đặt lại';
        }
    });

    // Simulate API call - Replace with actual fetch/axios call
    function simulateAPICall(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                const isSuccess = Math.random() > 0.3;
                
                if (isSuccess) {
                    resolve({ success: true, message: 'Email sent successfully' });
                } else {
                    reject(new Error('Không tìm thấy tài khoản với email này'));
                }
            }, 2000);
        });
    }

    // Countdown timer for resend
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

    // Add input animations
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

    // Add keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Initialize form animations
    setTimeout(() => {
        document.querySelectorAll('.form-group').forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});