class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.currentTab = 'general';
        this.initializeEventListeners();
        this.initializeTabs();
        this.updateThemePreview();
    }

    loadSettings() {
        const defaultSettings = {
            systemName: 'Hệ thống STEM Tiểu học',
            systemUrl: 'https://stem-tieuhoc.edu.vn',
            adminEmail: 'admin@stem-tieuhoc.edu.vn',
            timezone: 'Asia/Ho_Chi_Minh',
            language: 'vi',
            dateFormat: 'dd/mm/yyyy',
            currency: 'VND',
            allowRegistration: true,
            emailVerification: true,
            loginLimit: true,
            multiDeviceLogin: false,
            
            passwordPolicy: 'medium',
            sessionTimeout: 30,
            twoFactorAuth: 'optional',
            ddosProtection: true,
            bruteForceProtection: true,
            sqlInjectionProtection: true,
            xssProtection: true,
            
            themeColor: '#4361ee',
            themeMode: 'light',
            fontFamily: 'Quicksand',
            
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            smtpUsername: 'noreply@stem-tieuhoc.edu.vn',
            smtpEncryption: 'tls',
            
            apiStatus: 'enabled',
            apiKey: 'sk_live_xxxxxxxxxxxxxxxx',
            
            backupFrequency: 'weekly',
            backupTime: '02:00',
            backupRetention: '30',
            
            cacheEnabled: 'enabled',
            cacheDuration: 3600,
            debugMode: 'disabled',
            errorLogging: 'all',
            customCss: ''
        };

        try {
            const savedSettings = localStorage.getItem('stemSettings');
            if (savedSettings) {
                return { ...defaultSettings, ...JSON.parse(savedSettings) };
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }
        
        return defaultSettings;
    }

    saveSettings() {
        try {
            localStorage.setItem('stemSettings', JSON.stringify(this.settings));
            this.showNotification('Đã lưu cài đặt thành công!', 'success');
            return true;
        } catch (e) {
            console.error('Error saving settings:', e);
            this.showNotification('Lỗi khi lưu cài đặt!', 'error');
            return false;
        }
    }
    saveAllSettings() {
        this.collectSettingsFromForm();
        if (this.saveSettings()) {
            this.updateThemePreview();
        }
    }

    collectSettingsFromForm() {
        this.settings.systemName = document.getElementById('systemName').value;
        this.settings.systemUrl = document.getElementById('systemUrl').value;
        this.settings.adminEmail = document.getElementById('adminEmail').value;
        this.settings.timezone = document.getElementById('timezone').value;
        this.settings.language = document.getElementById('language').value;
        this.settings.dateFormat = document.getElementById('dateFormat').value;
        this.settings.currency = document.getElementById('currency').value;
        this.settings.allowRegistration = document.getElementById('allowRegistration').checked;
        this.settings.emailVerification = document.getElementById('emailVerification').checked;
        this.settings.loginLimit = document.getElementById('loginLimit').checked;
        this.settings.multiDeviceLogin = document.getElementById('multiDeviceLogin').checked;

        this.settings.passwordPolicy = document.getElementById('passwordPolicy').value;
        this.settings.sessionTimeout = parseInt(document.getElementById('sessionTimeout').value);
        this.settings.twoFactorAuth = document.getElementById('twoFactorAuth').value;
        this.settings.ddosProtection = document.getElementById('ddosProtection').checked;
        this.settings.bruteForceProtection = document.getElementById('bruteForceProtection').checked;
        this.settings.sqlInjectionProtection = document.getElementById('sqlInjectionProtection').checked;
        this.settings.xssProtection = document.getElementById('xssProtection').checked;

        this.settings.themeColor = document.getElementById('themeColor').value;
        this.settings.themeMode = document.getElementById('themeMode').value;
        this.settings.fontFamily = document.getElementById('fontFamily').value;

        this.settings.smtpHost = document.getElementById('smtpHost').value;
        this.settings.smtpPort = parseInt(document.getElementById('smtpPort').value);
        this.settings.smtpUsername = document.getElementById('smtpUsername').value;
        this.settings.smtpEncryption = document.getElementById('smtpEncryption').value;

        this.settings.apiStatus = document.getElementById('apiStatus').value;

        this.settings.backupFrequency = document.getElementById('backupFrequency').value;
        this.settings.backupTime = document.getElementById('backupTime').value;
        this.settings.backupRetention = document.getElementById('backupRetention').value;

        this.settings.cacheEnabled = document.getElementById('cacheEnabled').value;
        this.settings.cacheDuration = parseInt(document.getElementById('cacheDuration').value);
        this.settings.debugMode = document.getElementById('debugMode').value;
        this.settings.errorLogging = document.getElementById('errorLogging').value;
        this.settings.customCss = document.getElementById('customCss').value;
    }

    populateForm() {
        document.getElementById('systemName').value = this.settings.systemName;
        document.getElementById('systemUrl').value = this.settings.systemUrl;
        document.getElementById('adminEmail').value = this.settings.adminEmail;
        document.getElementById('timezone').value = this.settings.timezone;
        document.getElementById('language').value = this.settings.language;
        document.getElementById('dateFormat').value = this.settings.dateFormat;
        document.getElementById('currency').value = this.settings.currency;
        document.getElementById('allowRegistration').checked = this.settings.allowRegistration;
        document.getElementById('emailVerification').checked = this.settings.emailVerification;
        document.getElementById('loginLimit').checked = this.settings.loginLimit;
        document.getElementById('multiDeviceLogin').checked = this.settings.multiDeviceLogin;

        document.getElementById('passwordPolicy').value = this.settings.passwordPolicy;
        document.getElementById('sessionTimeout').value = this.settings.sessionTimeout;
        document.getElementById('twoFactorAuth').value = this.settings.twoFactorAuth;
        document.getElementById('ddosProtection').checked = this.settings.ddosProtection;
        document.getElementById('bruteForceProtection').checked = this.settings.bruteForceProtection;
        document.getElementById('sqlInjectionProtection').checked = this.settings.sqlInjectionProtection;
        document.getElementById('xssProtection').checked = this.settings.xssProtection;

        document.getElementById('themeColor').value = this.settings.themeColor;
        document.getElementById('colorValue').textContent = this.settings.themeColor;
        document.getElementById('themeMode').value = this.settings.themeMode;
        document.getElementById('fontFamily').value = this.settings.fontFamily;

        document.getElementById('smtpHost').value = this.settings.smtpHost;
        document.getElementById('smtpPort').value = this.settings.smtpPort;
        document.getElementById('smtpUsername').value = this.settings.smtpUsername;
        document.getElementById('smtpEncryption').value = this.settings.smtpEncryption;

        document.getElementById('apiStatus').value = this.settings.apiStatus;
        document.getElementById('apiKey').value = this.settings.apiKey;

        document.getElementById('backupFrequency').value = this.settings.backupFrequency;
        document.getElementById('backupTime').value = this.settings.backupTime;
        document.getElementById('backupRetention').value = this.settings.backupRetention;

        document.getElementById('cacheEnabled').value = this.settings.cacheEnabled;
        document.getElementById('cacheDuration').value = this.settings.cacheDuration;
        document.getElementById('debugMode').value = this.settings.debugMode;
        document.getElementById('errorLogging').value = this.settings.errorLogging;
        document.getElementById('customCss').value = this.settings.customCss;
    }

    initializeTabs() {
        const tabs = document.querySelectorAll('.settings-tab');
        const tabContents = document.querySelectorAll('.settings-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.settings-tab[data-tab="${tabId}"]`).classList.add('active');

        document.querySelectorAll('.settings-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-settings`).classList.add('active');

        this.currentTab = tabId;
    }

    updateThemePreview() {
        const themeColor = this.settings.themeColor;
        const previewCards = document.querySelectorAll('.preview-card');
        
        if (previewCards.length >= 2) {
            previewCards[0].style.background = themeColor;
            previewCards[0].style.color = 'white';
        }
    }

    initializeEventListeners() {
        document.getElementById('saveAllBtn').addEventListener('click', () => {
            this.saveAllSettings();
        });

        document.getElementById('systemCheckBtn').addEventListener('click', () => {
            this.performSystemCheck();
        });

        const themeColorInput = document.getElementById('themeColor');
        const colorValue = document.getElementById('colorValue');
        
        themeColorInput.addEventListener('input', (e) => {
            colorValue.textContent = e.target.value;
            this.updateThemePreview();
        });

        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        });

        document.querySelector('.copy-btn').addEventListener('click', () => {
            const apiKey = document.getElementById('apiKey');
            apiKey.select();
            apiKey.setSelectionRange(0, 99999);
            document.execCommand('copy');
            this.showNotification('Đã sao chép API Key!', 'success');
        });

document.querySelector('.regenerate-btn').addEventListener('click', () => {
    this.regenerateApiKey();
});

document.getElementById('testEmailBtn').addEventListener('click', () => {
    this.testEmailConfiguration();
});

document.getElementById('renewSSLBtn').addEventListener('click', () => {
    this.renewSSL();
});

document.getElementById('resetAppearanceBtn').addEventListener('click', () => {
    this.resetAppearance();
});

document.getElementById('createBackupBtn').addEventListener('click', () => {
    this.createBackup();
});

document.getElementById('restoreBackupBtn').addEventListener('click', () => {
    this.restoreBackup();
});

document.getElementById('downloadBackupBtn').addEventListener('click', () => {
    this.downloadBackup();
});

document.getElementById('clearCacheBtn').addEventListener('click', () => {
    this.clearCache();
});

document.getElementById('optimizeDbBtn').addEventListener('click', () => {
    this.optimizeDatabase();
});

document.getElementById('maintenanceModeBtn').addEventListener('click', () => {
    this.toggleMaintenanceMode();
});

document.getElementById('resetCssBtn').addEventListener('click', () => {
    this.resetCustomCss();
});

document.getElementById('saveCssBtn').addEventListener('click', () => {
    this.saveCustomCss();
});

document.getElementById('logoUpload').addEventListener('change', (e) => {
    this.handleLogoUpload(e);
});

document.querySelectorAll('.backup-item .btn-icon').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.closest('.btn-icon');
        const backupItem = action.closest('.backup-item');
        const backupName = backupItem.querySelector('h5').textContent;
        
        if (action.classList.contains('delete')) {
            this.deleteBackup(backupName);
        } else if (action.querySelector('.fa-undo')) {
            this.restoreSpecificBackup(backupName);
        } else if (action.querySelector('.fa-download')) {
            this.downloadSpecificBackup(backupName);
        }
    });
});
    }

    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    background: white;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    max-width: 400px;
                    border-left: 4px solid #4361ee;
                }
                
                .notification-success {
                    border-left-color: #06d6a0;
                }
                
                .notification-error {
                    border-left-color: #ef476f;
                }
                
                .notification-warning {
                    border-left-color: #ffd166;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .notification-content i {
                    font-size: 18px;
                }
                
                .notification-success .notification-content i {
                    color: #06d6a0;
                }
                
                .notification-error .notification-content i {
                    color: #ef476f;
                }
                
                .notification-warning .notification-content i {
                    color: #ffd166;
                }
                
                .notification-content span {
                    font-size: 14px;
                    color: #334155;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 5px;
                    transition: color 0.3s;
                }
                
                .notification-close:hover {
                    color: #ef476f;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    async performSystemCheck() {
        const btn = document.getElementById('systemCheckBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const checks = [
                { name: 'Kết nối cơ sở dữ liệu', status: 'success' },
                { name: 'Dịch vụ email', status: 'success' },
                { name: 'Chứng chỉ SSL', status: 'warning' },
                { name: 'Bộ nhớ cache', status: 'success' },
                { name: 'Bảo mật', status: 'success' },
                { name: 'Sao lưu', status: 'error' }
            ];
            
            this.showSystemCheckResults(checks);
            this.showNotification('Kiểm tra hệ thống hoàn tất!', 'success');
            
        } catch (error) {
            this.showNotification('Lỗi khi kiểm tra hệ thống!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    showSystemCheckResults(checks) {
        const existingResults = document.querySelector('.system-check-results');
        if (existingResults) {
            existingResults.remove();
        }
        
        const results = document.createElement('div');
        results.className = 'system-check-results';
        results.innerHTML = `
            <div class="results-header">
                <h4><i class="fas fa-clipboard-check"></i> Kết quả kiểm tra hệ thống</h4>
                <button class="close-results">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="results-list">
                ${checks.map(check => `
                    <div class="result-item result-${check.status}">
                        <div class="result-name">
                            <i class="fas ${check.status === 'success' ? 'fa-check-circle' : check.status === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'}"></i>
                            <span>${check.name}</span>
                        </div>
                        <div class="result-status">
                            <span class="status-badge status-${check.status}">
                                ${check.status === 'success' ? '✓ Thành công' : check.status === 'warning' ? '⚠ Cảnh báo' : '✗ Lỗi'}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const header = document.querySelector('.header');
        header.parentNode.insertBefore(results, header.nextSibling);
        
        const styles = document.createElement('style');
        styles.textContent = `
            .system-check-results {
                background: white;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 30px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                border: 1px solid #e2e8f0;
                animation: slideDown 0.3s ease;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .results-header h4 {
                font-size: 16px;
                font-weight: 600;
                color: #334155;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .close-results {
                background: none;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 5px;
                transition: color 0.3s;
            }
            
            .close-results:hover {
                color: #ef476f;
            }
            
            .results-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .result-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                border-radius: 8px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
            }
            
            .result-success {
                border-left: 4px solid #06d6a0;
            }
            
            .result-warning {
                border-left: 4px solid #ffd166;
            }
            
            .result-error {
                border-left: 4px solid #ef476f;
            }
            
            .result-name {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .result-name i {
                font-size: 16px;
            }
            
            .result-success .result-name i {
                color: #06d6a0;
            }
            
            .result-warning .result-name i {
                color: #ffd166;
            }
            
            .result-error .result-name i {
                color: #ef476f;
            }
            
            .result-name span {
                font-size: 14px;
                font-weight: 500;
                color: #334155;
            }
            
            .status-badge {
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
            
            .status-success {
                background: #d1fae5;
                color: #065f46;
            }
            
            .status-warning {
                background: #fef3c7;
                color: #92400e;
            }
            
            .status-error {
                background: #fee2e2;
                color: #991b1b;
            }
            
            @keyframes slideDown {
                from {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
        
        results.querySelector('.close-results').addEventListener('click', () => {
            results.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => results.remove(), 300);
        });
    }

    regenerateApiKey() {
        if (confirm('Bạn có chắc chắn muốn tạo lại API Key? Key hiện tại sẽ không thể sử dụng được nữa.')) {
            const newApiKey = 'sk_live_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            this.settings.apiKey = newApiKey;
            document.getElementById('apiKey').value = newApiKey;
            this.showNotification('Đã tạo API Key mới!', 'success');
        }
    }

    async testEmailConfiguration() {
        const btn = document.getElementById('testEmailBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const smtpHost = document.getElementById('smtpHost').value;
            const smtpUsername = document.getElementById('smtpUsername').value;
            
            if (!smtpHost || !smtpUsername) {
                throw new Error('Thiếu thông tin cấu hình SMTP');
            }
            
            this.showNotification('Email kiểm tra đã được gửi thành công!', 'success');
            
        } catch (error) {
            this.showNotification(`Lỗi: ${error.message}`, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    async renewSSL() {
        const btn = document.getElementById('renewSSLBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gia hạn...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            this.showNotification('Đã gia hạn chứng chỉ SSL thành công!', 'success');
            
            const sslDetails = document.querySelector('.ssl-details p');
            if (sslDetails) {
                sslDetails.innerHTML = 'Hết hạn: 20/09/2024 • Nhà cung cấp: Let\'s Encrypt';
            }
            
        } catch (error) {
            this.showNotification('Lỗi khi gia hạn SSL!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    resetAppearance() {
        if (confirm('Bạn có chắc chắn muốn đặt lại tất cả cài đặt giao diện về mặc định?')) {
            this.settings.themeColor = '#4361ee';
            this.settings.themeMode = 'light';
            this.settings.fontFamily = 'Quicksand';
            
            document.getElementById('themeColor').value = this.settings.themeColor;
            document.getElementById('colorValue').textContent = this.settings.themeColor;
            document.getElementById('themeMode').value = this.settings.themeMode;
            document.getElementById('fontFamily').value = this.settings.fontFamily;
            
            this.updateThemePreview();
            this.showNotification('Đã đặt lại giao diện về mặc định!', 'success');
        }
    }

    async createBackup() {
        const btn = document.getElementById('createBackupBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang sao lưu...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 19).replace(/[-:]/g, '');
            const backupName = `Backup_${dateStr}.zip`;
            const backupSize = Math.floor(Math.random() * 100) + 200; 
            
            const backupItem = document.createElement('div');
            backupItem.className = 'backup-item';
            backupItem.innerHTML = `
                <div class="backup-info">
                    <i class="fas fa-database"></i>
                    <div>
                        <h5>${backupName}</h5>
                        <p>${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • ${backupSize} MB</p>
                    </div>
                </div>
                <div class="backup-actions">
                    <button class="btn-icon" title="Khôi phục">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="btn-icon" title="Tải xuống">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-icon delete" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            const backupItems = document.querySelector('.backup-items');
            backupItems.insertBefore(backupItem, backupItems.firstChild);
            
            backupItem.querySelectorAll('.btn-icon').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const action = e.target.closest('.btn-icon');
                    const backupName = backupItem.querySelector('h5').textContent;
                    
                    if (action.classList.contains('delete')) {
                        this.deleteBackup(backupName);
                    } else if (action.querySelector('.fa-undo')) {
                        this.restoreSpecificBackup(backupName);
                    } else if (action.querySelector('.fa-download')) {
                        this.downloadSpecificBackup(backupName);
                    }
                });
            });
            
            this.showNotification('Đã tạo bản sao lưu thành công!', 'success');
            
        } catch (error) {
            this.showNotification('Lỗi khi tạo bản sao lưu!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    restoreBackup() {
        this.showNotification('Vui lòng chọn bản sao lưu cụ thể để khôi phục!', 'info');
    }

    downloadBackup() {
        this.showNotification('Vui lòng chọn bản sao lưu cụ thể để tải xuống!', 'info');
    }

    async clearCache() {
        const btn = document.getElementById('clearCacheBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xóa...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.showNotification('Đã xóa cache thành công!', 'success');
        } catch (error) {
            this.showNotification('Lỗi khi xóa cache!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    async optimizeDatabase() {
        const btn = document.getElementById('optimizeDbBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tối ưu...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Đã tối ưu cơ sở dữ liệu thành công!', 'success');
        } catch (error) {
            this.showNotification('Lỗi khi tối ưu cơ sở dữ liệu!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    toggleMaintenanceMode() {
        if (confirm('Bật chế độ bảo trì sẽ tạm thời đóng hệ thống. Bạn có chắc chắn?')) {
            const btn = document.getElementById('maintenanceModeBtn');
            const isActive = btn.classList.contains('active');
            
            if (isActive) {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-tools"></i> Chế độ bảo trì';
                this.showNotification('Đã tắt chế độ bảo trì!', 'success');
            } else {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-check"></i> Tắt bảo trì';
                this.showNotification('Đã bật chế độ bảo trì!', 'warning');
            }
        }
    }

    resetCustomCss() {
        if (confirm('Bạn có chắc chắn muốn đặt lại CSS tùy chỉnh?')) {
            document.getElementById('customCss').value = '';
            this.showNotification('Đã đặt lại CSS!', 'success');
        }
    }

    saveCustomCss() {
        this.settings.customCss = document.getElementById('customCss').value;
        this.saveSettings();
        this.showNotification('Đã lưu CSS tùy chỉnh!', 'success');
    }

    handleLogoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            this.showNotification('Kích thước file tối đa là 2MB!', 'error');
            return;
        }
        
        if (!file.type.match('image.*')) {
            this.showNotification('Chỉ chấp nhận file ảnh!', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.showNotification('Đã tải lên logo thành công!', 'success');
        };
        reader.readAsDataURL(file);
    }

    deleteBackup(backupName) {
        if (confirm(`Bạn có chắc chắn muốn xóa bản sao lưu "${backupName}"?`)) {
            const backupItems = document.querySelectorAll('.backup-item');
            backupItems.forEach(item => {
                if (item.querySelector('h5').textContent === backupName) {
                    item.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => item.remove(), 300);
                }
            });
            
            this.showNotification('Đã xóa bản sao lưu!', 'success');
        }
    }

    restoreSpecificBackup(backupName) {
        if (confirm(`Bạn có chắc chắn muốn khôi phục hệ thống từ bản sao lưu "${backupName}"?`)) {
            const btn = event.target.closest('.btn-icon');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                this.showNotification('Đã khôi phục thành công!', 'success');
            }, 2000);
        }
    }

    downloadSpecificBackup(backupName) {
        const btn = event.target.closest('.btn-icon');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            this.showNotification(`Đã bắt đầu tải xuống: ${backupName}`, 'success');
            
            const link = document.createElement('a');
            link.href = '#';
            link.download = backupName;
            link.click();
        }, 1500);
    }

    exportSettings() {
        const dataStr = JSON.stringify(this.settings, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `stem-settings-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('Đã xuất cài đặt thành công!', 'success');
    }

    importSettings(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedSettings = JSON.parse(e.target.result);
                this.settings = { ...this.settings, ...importedSettings };
                this.populateForm();
                this.saveSettings();
                this.showNotification('Đã nhập cài đặt thành công!', 'success');
            } catch (error) {
                this.showNotification('File không hợp lệ!', 'error');
            }
        };
        reader.readAsText(file);
    }

    resetAllSettings() {
        if (confirm('Bạn có chắc chắn muốn đặt lại TẤT CẢ cài đặt về mặc định? Thao tác này không thể hoàn tác.')) {
            localStorage.removeItem('stemSettings');
            this.settings = this.loadSettings();
            this.populateForm();
            this.showNotification('Đã đặt lại tất cả cài đặt về mặc định!', 'success');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const settingsManager = new SettingsManager();
    settingsManager.populateForm();
    
    if (!document.getElementById('exportSettingsBtn')) {
        const exportBtn = document.createElement('button');
        exportBtn.id = 'exportSettingsBtn';
        exportBtn.className = 'btn-secondary';
        exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Xuất cài đặt';
        exportBtn.addEventListener('click', () => settingsManager.exportSettings());
        
        const importBtn = document.createElement('input');
        importBtn.type = 'file';
        importBtn.id = 'importSettingsBtn';
        importBtn.style.display = 'none';
        importBtn.accept = '.json';
        importBtn.addEventListener('change', (e) => settingsManager.importSettings(e));
        
        const importLabel = document.createElement('label');
        importLabel.htmlFor = 'importSettingsBtn';
        importLabel.className = 'btn-secondary';
        importLabel.innerHTML = '<i class="fas fa-file-import"></i> Nhập cài đặt';
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-warning';
        resetBtn.innerHTML = '<i class="fas fa-undo"></i> Đặt lại tất cả';
        resetBtn.addEventListener('click', () => settingsManager.resetAllSettings());
        
        const headerActions = document.querySelector('.header-actions');
        headerActions.appendChild(exportBtn);
        headerActions.appendChild(importLabel);
        headerActions.appendChild(importBtn);
        headerActions.appendChild(resetBtn);
    }
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            settingsManager.saveAllSettings();
        }
    });
    
    window.addEventListener('beforeunload', (e) => {
        if (settingsManager.hasUnsavedChanges()) {
            e.preventDefault();
            e.returnValue = 'Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn rời đi?';
            settingsManager.saveSettings();
        }
    });
    
    settingsManager.hasUnsavedChanges = function() {
        const originalSettings = JSON.stringify(this.loadSettings());
        this.collectSettingsFromForm();
        const currentSettings = JSON.stringify(this.settings);
        return originalSettings !== currentSettings;
    };
});