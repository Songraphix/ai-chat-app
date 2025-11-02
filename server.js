// ============================================
// AI CHAT WEB SERVER WITH MODERATION
// ============================================
// Express.js server that provides a web interface for the AI chat app
// ============================================

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURATION SECTION
// ============================================

const SYSTEM_PROMPT = `You are a helpful, friendly, and safe AI assistant. 
Your goal is to provide accurate and constructive information.
Always be respectful and avoid generating harmful content.`;

const BANNED_KEYWORDS = [
  'kill',
  'hack', 
  'bomb',
  'exploit',
  'violence'
];

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ============================================
// MIDDLEWARE
// ============================================

// Parse JSON request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// MODERATION FUNCTIONS
// ============================================

function containsBannedContent(text) {
  const lowerText = text.toLowerCase();
  return BANNED_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function moderateOutput(text) {
  let moderatedText = text;
  let foundBannedContent = false;
  
  BANNED_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    if (regex.test(moderatedText)) {
      foundBannedContent = true;
      moderatedText = moderatedText.replace(regex, '[REDACTED]');
    }
  });
  
  return {
    isSafe: !foundBannedContent,
    text: moderatedText
  };
}

// ============================================
// AI API CALL FUNCTION
// ============================================

async function callOpenRouter(userPrompt) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not configured');
  }
  
  const requestBody = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 500,
    temperature: 0.7
  };
  
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Groq API Error (${response.status}): ${errorData}`);
  }
  
  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content;
  
  if (!aiMessage) {
    throw new Error('No response content from Groq');
  }
  
  return aiMessage.trim();
}

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validate input
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ 
        error: 'Invalid input',
        message: 'Please provide a valid message'
      });
    }
    
    // Input moderation
    if (containsBannedContent(message)) {
      return res.status(400).json({
        error: 'Moderation violation',
        message: 'Your input violated the moderation policy. Please rephrase your question without harmful content.'
      });
    }
    
    // Call AI API
    const aiResponse = await callOpenRouter(message);
    
    // Output moderation
    const moderationResult = moderateOutput(aiResponse);
    
    // Return response
    res.json({
      success: true,
      response: moderationResult.text,
      isSafe: moderationResult.isSafe,
      warning: moderationResult.isSafe ? null : 'Response contained inappropriate content (redacted)'
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message || 'An error occurred while processing your request'
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   AI Chat with Moderation System      ║');
  console.log('║         Web Server Running            ║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
  console.log(`📝 Open your browser and visit the URL above\n`);
  
  if (!GROQ_API_KEY) {
    console.log('⚠️  WARNING: GROQ_API_KEY not set!');
    console.log('Please set your API key:');
    console.log('Windows CMD: set GROQ_API_KEY=your-key-here');
    console.log('Windows PowerShell: $env:GROQ_API_KEY="your-key-here"\n');
  }
});
