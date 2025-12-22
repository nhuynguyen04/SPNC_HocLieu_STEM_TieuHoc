document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('vi-VN', dateOptions);

    const navItems = document.querySelectorAll('.nav-item');
    const logoutBtn = document.querySelector('.logout-btn');
    const notificationBtn = document.querySelector('.notification');
    const viewAllBtn = document.querySelector('.view-all');
    const addBtn = document.querySelector('.btn-primary');
    const activityItems = document.querySelectorAll('.activity-item');
    const materialItems = document.querySelectorAll('.material-item');

    logoutBtn.addEventListener('click', function() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            alert('Đăng xuất thành công!');
        }
    });

    notificationBtn.addEventListener('click', function() {
        alert('Bạn có 3 thông báo mới!');
    });

    viewAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Chuyển đến trang xem tất cả hoạt động');
    });

    addBtn.addEventListener('click', function() {
        alert('Thêm học liệu mới');
    });

    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityText = this.querySelector('p').textContent;
            alert(`Chi tiết hoạt động: ${activityText}`);
        });
    });

    materialItems.forEach(item => {
        item.addEventListener('click', function() {
            const materialName = this.querySelector('h4').textContent;
            alert(`Xem chi tiết học liệu: ${materialName}`);
        });
    });

    const distributionChart = new Chart(document.getElementById('distributionChart'), {
        type: 'bar',
        data: {
            labels: ['Khoa học', 'Công nghệ', 'Kỹ thuật', 'Toán học'],
            datasets: [{
                label: 'Số lượng học liệu',
                data: [5, 5, 3, 4],
                backgroundColor: [
                    'rgba(239, 71, 111, 0.8)',
                    'rgba(17, 138, 178, 0.8)',
                    'rgba(6, 214, 160, 0.8)',
                    'rgba(255, 209, 102, 0.8)'
                ],
                borderColor: [
                    '#ef476f',
                    '#118ab2',
                    '#06d6a0',
                    '#ffd166'
                ],
                borderWidth: 2,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});