document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const codeForm = document.getElementById('codeForm');
    const resetForm = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const verificationCodeInput = document.getElementById('verificationCode');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const userEmailSpan = document.getElementById('userEmail');
    const stepSubtitle = document.getElementById('stepSubtitle');
    
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const resendCodeBtn = document.getElementById('resendCodeBtn');
    const countdownElement = document.getElementById('countdown');
    const countdownNumber = document.querySelector('.countdown-number');
    
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const infoAlert = document.getElementById('infoAlert');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const infoMessage = document.getElementById('infoMessage');

    let userEmail = '';
    let verificationCode = '';

    function initializeCodeInputs() {
        const codeInputs = document.querySelectorAll('.code-input');
        
        codeInputs.forEach((input, index) => {
            input.value = '';
            input.classList.remove('filled', 'error');
            
            if (index === 0) {
                setTimeout(() => input.focus(), 100);
            }

            input.addEventListener('input', function(e) {
                const value = e.target.value;
                
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                if (value.length === 1) {
                    e.target.classList.add('filled');
                    e.target.classList.remove('error');
                    
                    if (index < 5) {
                        codeInputs[index + 1].focus();
                    } else {
                        updateVerificationCode();
                        verifyCodeBtn.focus();
                    }
                } else if (value.length === 0) {
                    e.target.classList.remove('filled');
                }
                
                updateVerificationCode();
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                    codeInputs[index - 1].focus();
                }
            });

            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text');
                const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
                
                if (numbers.length === 6) {
                    numbers.split('').forEach((num, i) => {
                        if (codeInputs[i]) {
                            codeInputs[i].value = num;
                            codeInputs[i].classList.add('filled');
                            codeInputs[i].classList.remove('error');
                        }
                    });
                    updateVerificationCode();
                    verifyCodeBtn.focus();
                }
            });
        });
    }

    function updateVerificationCode() {
        const codeInputs = document.querySelectorAll('.code-input');
        const code = Array.from(codeInputs).map(input => input.value).join('');
        verificationCodeInput.value = code;
        return code;
    }

    function showAlert(alertElement, message = '') {
        hideAllAlerts();
        if (message && alertElement.querySelector('p')) {
            alertElement.querySelector('p').textContent = message;
        }
        alertElement.style.display = 'flex';
    }

    function hideAllAlerts() {
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
        infoAlert.style.display = 'none';
    }

    function showStep(stepNumber) {
        emailForm.style.display = 'none';
        codeForm.style.display = 'none';
        resetForm.style.display = 'none';
        
        switch(stepNumber) {
            case 1:
                emailForm.style.display = 'block';
                stepSubtitle.textContent = 'Nhập email của bạn để nhận mã xác nhận';
                break;
            case 2:
                codeForm.style.display = 'block';
                stepSubtitle.textContent = 'Nhập mã xác nhận từ email';
                userEmailSpan.textContent = userEmail;
                initializeCodeInputs();
                break;
            case 3:
                resetForm.style.display = 'block';
                stepSubtitle.textContent = 'Tạo mật khẩu mới cho tài khoản của bạn';
                break;
        }
        hideAllAlerts();
    }

    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateEmail(emailInput.value.trim())) {
            showAlert(errorAlert, 'Email không hợp lệ');
            return;
        }

        sendCodeBtn.classList.add('loading');
        sendCodeBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang gửi mã...';

        try {
            await sendVerificationCode(emailInput.value.trim());
            userEmail = emailInput.value.trim();
            showStep(2);
            startResendCountdown();
            showAlert(infoAlert, 'Mã xác nhận đã được gửi đến email của bạn');
        } catch (error) {
            showAlert(errorAlert, error.message || 'Có lỗi xảy ra khi gửi mã');
        } finally {
            sendCodeBtn.classList.remove('loading');
            sendCodeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi mã xác nhận';
        }
    });

    codeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const code = updateVerificationCode();
        if (code.length !== 6) {
            showAlert(errorAlert, 'Vui lòng nhập đủ 6 số mã xác nhận');
            const codeInputs = document.querySelectorAll('.code-input');
            codeInputs.forEach(input => {
                if (!input.value) {
                    input.classList.add('error');
                }
            });
            return;
        }

        verifyCodeBtn.classList.add('loading');
        verifyCodeBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang xác nhận...';

        try {
            await verifyCode(code);
            verificationCode = code;
            showStep(3);
            showAlert(successAlert, 'Mã xác nhận hợp lệ. Hãy tạo mật khẩu mới');
        } catch (error) {
            showAlert(errorAlert, error.message || 'Mã xác nhận không đúng');
            const codeInputs = document.querySelectorAll('.code-input');
            codeInputs.forEach(input => {
                input.classList.add('error');
            });
        } finally {
            verifyCodeBtn.classList.remove('loading');
            verifyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Xác nhận mã';
        }
    });

    resetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!validatePassword(newPassword)) {
            showAlert(errorAlert, 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert(errorAlert, 'Mật khẩu xác nhận không khớp');
            return;
        }

        resetPasswordBtn.classList.add('loading');
        resetPasswordBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang đặt lại...';

        try {
            await resetPassword(newPassword);
            showAlert(successAlert, 'Mật khẩu đã được đặt lại thành công!');
            setTimeout(() => {
                window.location.href = 'signin.php';
            }, 2000);
        } catch (error) {
            showAlert(errorAlert, error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
        } finally {
            resetPasswordBtn.classList.remove('loading');
            resetPasswordBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Đặt lại mật khẩu';
        }
    });

    resendCodeBtn.addEventListener('click', async function() {
        if (resendCodeBtn.disabled) return;

        resendCodeBtn.disabled = true;
        resendCodeBtn.innerHTML = '<i class="fas fa-spinner"></i> Đang gửi lại...';

        try {
            await sendVerificationCode(userEmail);
            showAlert(infoAlert, 'Mã xác nhận mới đã được gửi');
            startResendCountdown();
            initializeCodeInputs();
        } catch (error) {
            showAlert(errorAlert, error.message || 'Có lỗi khi gửi lại mã');
            resendCodeBtn.disabled = false;
            resendCodeBtn.innerHTML = '<i class="fas fa-redo"></i> Gửi lại mã';
        }
    });

    function startResendCountdown() {
        let countdown = 60;
        resendCodeBtn.disabled = true;
        resendCodeBtn.style.display = 'none';
        countdownElement.style.display = 'block';
        countdownNumber.textContent = countdown;

        const timer = setInterval(() => {
            countdown--;
            countdownNumber.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(timer);
                resendCodeBtn.disabled = false;
                resendCodeBtn.style.display = 'inline-flex';
                countdownElement.style.display = 'none';
                resendCodeBtn.innerHTML = '<i class="fas fa-redo"></i> Gửi lại mã';
            }
        }, 1000);
    }

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const input = document.getElementById(target);
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    // Real API calls to backend endpoints
    async function sendVerificationCode(email) {
        const formData = new FormData();
        formData.append('email', email);

        const url = (typeof APP_BASE !== 'undefined' ? APP_BASE : '') + '/auth/forgot-password/send-code';
        const resp = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!resp.ok) {
            const text = await resp.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.message || 'Không thể gửi mã xác nhận');
            } catch (e) {
                console.error('Response:', text);
                throw new Error('Có lỗi xảy ra khi gửi mã');
            }
        }

        const data = await resp.json();
        if (!data.success) {
            throw new Error(data.message || 'Không thể gửi mã xác nhận');
        }
        return data;
    }

    async function verifyCode(code) {
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('code', code);

        const url = (typeof APP_BASE !== 'undefined' ? APP_BASE : '') + '/auth/forgot-password/verify-code';
        const resp = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!resp.ok) {
            const text = await resp.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.message || 'Mã xác nhận không đúng');
            } catch (e) {
                console.error('Response:', text);
                throw new Error('Có lỗi xảy ra khi xác thực mã');
            }
        }

        const data = await resp.json();
        if (!data.success) {
            throw new Error(data.message || 'Mã xác nhận không đúng');
        }
        return data;
    }

    async function resetPassword(newPassword) {
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('code', verificationCode || updateVerificationCode());
        formData.append('password', newPassword);

        const url = (typeof APP_BASE !== 'undefined' ? APP_BASE : '') + '/auth/forgot-password/reset';
        const resp = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!resp.ok) {
            const text = await resp.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.message || 'Không thể đặt lại mật khẩu');
            } catch (e) {
                console.error('Response:', text);
                throw new Error('Có lỗi xảy ra khi đặt lại mật khẩu');
            }
        }

        const data = await resp.json();
        if (!data.success) {
            throw new Error(data.message || 'Không thể đặt lại mật khẩu');
        }
        return data;
    }
});