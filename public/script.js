// ============================================
// CLIENT-SIDE JAVASCRIPT
// ============================================
// Handles UI interactions and API communication
// ============================================

// DOM Elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messagesContainer = document.getElementById('messagesContainer');
const sendButton = document.getElementById('sendButton');
const loadingOverlay = document.getElementById('loadingOverlay');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Escapes HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Auto-resize textarea as user types
 */
function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
}

/**
 * Scroll to bottom of messages
 */
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show/hide loading overlay
 */
function setLoading(isLoading) {
    if (isLoading) {
        loadingOverlay.classList.remove('hidden');
        sendButton.disabled = true;
        userInput.disabled = true;
    } else {
        loadingOverlay.classList.add('hidden');
        sendButton.disabled = false;
        userInput.disabled = false;
    }
}

// ============================================
// MESSAGE FUNCTIONS
// ============================================

/**
 * Remove welcome message when first message is sent
 */
function removeWelcomeMessage() {
    const welcomeMsg = messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
}

/**
 * Create and append a message bubble
 */
function addMessage(text, isUser, warning = null) {
    removeWelcomeMessage();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;
    
    contentDiv.appendChild(textDiv);
    
    // Add warning if present
    if (warning) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'message-warning';
        warningDiv.innerHTML = `⚠️ ${escapeHtml(warning)}`;
        contentDiv.appendChild(warningDiv);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottom();
}

/**
 * Show error message
 */
function showError(message) {
    removeWelcomeMessage();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `❌ ${escapeHtml(message)}`;
    messagesContainer.appendChild(errorDiv);
    
    scrollToBottom();
}

// ============================================
// API COMMUNICATION
// ============================================

/**
 * Send message to the server
 */
async function sendMessage(message) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to get response from server');
        }
        
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error. Please check your connection.');
    }
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle form submission
 */
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = userInput.value.trim();
    
    if (!message) {
        return;
    }
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear and reset input
    userInput.value = '';
    autoResizeTextarea();
    
    // Show loading state
    setLoading(true);
    
    try {
        // Send message to server
        const response = await sendMessage(message);
        
        // Add AI response to chat
        const warning = response.warning || null;
        addMessage(response.response, false, warning);
        
    } catch (error) {
        // Show error message
        showError(error.message);
    } finally {
        // Hide loading state
        setLoading(false);
        userInput.focus();
    }
});

/**
 * Handle Enter key (send) vs Shift+Enter (new line)
 */
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.requestSubmit();
    }
});

/**
 * Auto-resize textarea on input
 */
userInput.addEventListener('input', autoResizeTextarea);

// ============================================
// INITIALIZATION
// ============================================

// Focus on input when page loads
window.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    showError('No internet connection. Please check your network.');
});
