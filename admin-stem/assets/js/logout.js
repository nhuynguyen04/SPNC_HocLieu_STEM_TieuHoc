let seconds = 10;
const countdownElement = document.getElementById('seconds');

const countdown = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;
    
    if (seconds <= 0) {
        clearInterval(countdown);
        window.location.href = 'login.php';
    }
}, 1000);

document.querySelector('.btn-primary').addEventListener('click', () => {
    clearInterval(countdown);
});