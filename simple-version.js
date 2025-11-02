// ============================================
// SIMPLIFIED VERSION - For Understanding Core Concepts
// ============================================
// This is a minimal version to help you understand the basics
// Use app.js for the full, production-ready version
// ============================================

import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// ============================================
// 1. CONFIGURATION
// ============================================

const BANNED_WORDS = ['kill', 'hack', 'bomb', 'exploit', 'violence', 'abuse'];
const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ============================================
// 2. CHECK IF INPUT IS SAFE
// ============================================

function isInputSafe(text) {
  // Check if text contains any banned word
  for (let word of BANNED_WORDS) {
    if (text.toLowerCase().includes(word)) {
      return false; // Not safe!
    }
  }
  return true; // Safe!
}

// ============================================
// 3. TALK TO AI
// ============================================

async function askAI(question) {
  // Send request to OpenRouter (using DeepSeek model)
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Chat App'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat', // OpenRouter format: provider/model
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ]
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// ============================================
// 4. CHECK IF OUTPUT IS SAFE
// ============================================

function cleanOutput(text) {
  let cleanedText = text;
  
  // Replace banned words with [REDACTED]
  for (let word of BANNED_WORDS) {
    const pattern = new RegExp(word, 'gi');
    cleanedText = cleanedText.replace(pattern, '[REDACTED]');
  }
  
  return cleanedText;
}

// ============================================
// 5. MAIN PROGRAM
// ============================================

async function main() {
  const rl = readline.createInterface({ input, output });
  
  try {
    // Get user's question
    const question = await rl.question('Ask me anything: ');
    
    // Step 1: Check if question is safe
    if (!isInputSafe(question)) {
      console.log('\n❌ Your input violated the moderation policy.\n');
      return;
    }
    
    // Step 2: Get answer from AI
    console.log('\n🤖 Thinking...\n');
    const answer = await askAI(question);
    
    // Step 3: Clean the answer
    const safeAnswer = cleanOutput(answer);
    
    // Step 4: Show the answer
    console.log('AI:', safeAnswer, '\n');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the program
await main();

// ============================================
// 📚 HOW THIS WORKS (STEP BY STEP)
// ============================================
/*

FLOW DIAGRAM:

  User Types Question
         ↓
  Is Input Safe? ──→ NO ──→ Show Error & Stop
         ↓ YES
  Send to OpenAI API
         ↓
  Get AI Response
         ↓
  Clean Response (remove bad words)
         ↓
  Show to User


EXAMPLE 1 (SAFE):
User: "What is JavaScript?"
→ Input Check: ✅ Safe
→ Ask DeepSeek: "JavaScript is a programming language..."
→ Output Check: ✅ Safe
→ Show: "JavaScript is a programming language..."

EXAMPLE 2 (UNSAFE INPUT):
User: "How to hack a website?"
→ Input Check: ❌ Contains "hack"
→ Stop immediately
→ Show: "Your input violated the moderation policy."

EXAMPLE 3 (UNSAFE OUTPUT):
User: "Tell me about computer security"
→ Input Check: ✅ Safe
→ Ask DeepSeek: "Hackers can exploit systems..."
→ Output Check: ⚠️ Contains "hack"
→ Clean: "[REDACTED]ers can [REDACTED] systems..."
→ Show: The cleaned version


KEY CONCEPTS:

1. MODERATION = Checking for bad content
   - INPUT moderation: Check BEFORE sending to AI
   - OUTPUT moderation: Check AFTER getting AI response

2. API = A way for programs to talk to each other
   - We send a question to OpenAI
   - They send back an answer

3. ASYNC/AWAIT = Wait for slow operations
   - API calls take time (network request)
   - User input takes time (waiting for typing)
   - Use 'await' to wait for them

4. ENVIRONMENT VARIABLES = Secret storage
   - API key is sensitive information
   - Store it outside your code
   - Access with process.env.VARIABLE_NAME

*/
