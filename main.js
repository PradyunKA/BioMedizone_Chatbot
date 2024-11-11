const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const chatForm = document.getElementById('chatForm');
const chatInput = chatForm.querySelector('.chat-input');

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Chat form submission (placeholder functionality)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
        console.log('Sent message:', message);
        chatInput.value = '';
    }
});