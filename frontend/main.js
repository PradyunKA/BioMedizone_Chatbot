const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const chatForm = document.getElementById('chatForm');
const chatInput = chatForm.querySelector('.chat-input');
const chatHistory = document.querySelector('.chat-history'); // Select the correct chat history container

// Define the backend URL using a placeholder or an environment variable-like configuration.
// Developers can set the correct backend URL here.
const BACKEND_URL = window.env?.BACKEND_URL || 'http://YOUR_BACKEND_URL_HERE';

// Load dark mode state
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Handle message submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    
    if (userMessage) {
        // Append the user's message to the chat history
        appendMessage('User', userMessage);
        
        try {
            // Send message to backend
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });
            
            const data = await response.json();
            // Append the AI response to the chat history
            appendMessage('AI', data.response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('AI', 'Sorry, there was an error processing your request.');
        }

        // Clear input field
        chatInput.value = '';
    }
});

// Function to append message to chat history
function appendMessage(sender, message) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatHistory.appendChild(newMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom to show the latest message
}
