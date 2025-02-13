class Chatbot {
    constructor() {
        this.messages = [];
    }

    async sendMessage(message) {
        try {
            // Add user message to chat history
            this.messages.push({ role: 'user', content: message });

            // In a real implementation, you would make an API call to OpenAI here
            // For now, we'll simulate a response
            const response = await this.simulateAIResponse(message);
            
            // Add AI response to chat history
            this.messages.push({ role: 'assistant', content: response });
            
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            return 'Sorry, I encountered an error. Please try again.';
        }
    }

    simulateAIResponse(message) {
        // This is a placeholder. In production, replace with actual OpenAI API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = {
                    'default': "I'm here to help you with farming-related questions. What would you like to know?",
                    'crop': "For optimal crop health, ensure proper irrigation and monitor soil nutrients regularly.",
                    'weather': "I can help you understand weather patterns and their impact on farming.",
                    'soil': "Regular soil testing is crucial for maintaining optimal growing conditions."
                };

                const keyword = Object.keys(responses).find(key => 
                    message.toLowerCase().includes(key)
                ) || 'default';

                resolve(responses[keyword]);
            }, 1000);
        });
    }
}

// Initialize chatbot
const chatbot = new Chatbot();

// DOM elements
const chatbotWidget = document.getElementById('chatbot');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Toggle chat window
chatbotWidget.addEventListener('click', () => {
    chatContainer.classList.toggle('chat-open');
    if (chatContainer.classList.contains('chat-open')) {
        messageInput.focus();
    }
});

// Send message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message to chat
    appendMessage('user', message);
    messageInput.value = '';

    // Get bot response
    const response = await chatbot.sendMessage(message);
    appendMessage('bot', response);
}

// Append message to chat window
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
