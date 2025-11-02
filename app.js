// ============================================
// AI CHAT WITH MODERATION - Educational Version
// ============================================
// This script demonstrates how to:
// 1. Accept user input
// 2. Moderate input for safety
// 3. Call an AI API (OpenAI)
// 4. Moderate output for safety
// 5. Display results to the user
// ============================================

// Import readline module - this allows us to read user input from the command line
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// ============================================
// CONFIGURATION SECTION
// ============================================

// System Prompt: This tells the AI how to behave
// Think of it as giving personality/instructions to the AI before the user talks to it
const SYSTEM_PROMPT = `You are a helpful, friendly, and safe AI assistant. 
Your goal is to provide accurate and constructive information.
Always be respectful and avoid generating harmful content.`;

// Banned Keywords: Words we don't want in input or output
// These are just examples - in production, you'd have a more comprehensive list
const BANNED_KEYWORDS = [
  'kill',
  'hack', 
  'bomb',
  'exploit',
  'violence'
];

// API Configuration for OpenRouter (supports multiple AI models)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Read API key from environment variable
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'; // OpenRouter API endpoint

// ============================================
// MODERATION FUNCTIONS
// ============================================

/**
 * INPUT MODERATION
 * Checks if user's input contains any banned keywords
 * @param {string} text - The text to check
 * @returns {boolean} - true if banned content found, false if safe
 */
function containsBannedContent(text) {
  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Check each banned keyword
  // .some() returns true if ANY keyword is found
  return BANNED_KEYWORDS.some(keyword => {
    return lowerText.includes(keyword);
  });
}

/**
 * OUTPUT MODERATION
 * Checks AI response and either flags it or redacts banned content
 * @param {string} text - The AI response to moderate
 * @returns {object} - {isSafe: boolean, text: string}
 */
function moderateOutput(text) {
  let moderatedText = text;
  let foundBannedContent = false;
  
  // Check each banned keyword in the output
  BANNED_KEYWORDS.forEach(keyword => {
    // Create a regex pattern that matches the keyword (case-insensitive)
    // 'gi' means: g=global (all occurrences), i=case insensitive
    const regex = new RegExp(keyword, 'gi');
    
    // If we find the keyword
    if (regex.test(moderatedText)) {
      foundBannedContent = true;
      // Replace it with [REDACTED]
      moderatedText = moderatedText.replace(regex, '[REDACTED]');
    }
  });
  
  // Return both the safety status and the (possibly modified) text
  return {
    isSafe: !foundBannedContent,
    text: moderatedText
  };
}

// ============================================
// AI API CALL FUNCTION
// ============================================

/**
 * Sends a request to OpenRouter's API (access to multiple AI models)
 * @param {string} userPrompt - The user's question/prompt
 * @returns {Promise<string>} - The AI's response
 */
async function callOpenRouter(userPrompt) {
  // Check if API key exists
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      '❌ OPENROUTER_API_KEY not found!\n' +
      'Please set it as an environment variable:\n' +
      'Windows CMD: set OPENROUTER_API_KEY=your-key-here\n' +
      'Windows PowerShell: $env:OPENROUTER_API_KEY="your-key-here"\n' +
      'Then run the script again.'
    );
  }
  
  console.log('\n🤖 Sending request to OpenRouter (DeepSeek model)...\n');
  
  // Prepare the request body
  // OpenRouter uses OpenAI's Chat Completion API format
  const requestBody = {
    model: 'deepseek/deepseek-chat', // Using DeepSeek through OpenRouter
    messages: [
      // System message: Sets the AI's behavior
      { role: 'system', content: SYSTEM_PROMPT },
      // User message: The actual question/prompt
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 500,  // Limit response length (1 token ≈ 4 characters)
    temperature: 0.7  // Controls randomness (0 = focused, 1 = creative)
  };
  
  try {
    // Make the HTTP POST request to OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000', // Optional: for rankings
        'X-Title': 'AI Chat Moderation App' // Optional: show in rankings
      },
      body: JSON.stringify(requestBody)
    });
    
    // Check if request was successful
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenRouter API Error (${response.status}): ${errorData}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Extract the AI's message from the response
    // OpenRouter uses OpenAI format: data.choices[0].message.content
    const aiMessage = data.choices?.[0]?.message?.content;
    
    if (!aiMessage) {
      throw new Error('No response content from OpenRouter');
    }
    
    return aiMessage.trim();
    
  } catch (error) {
    console.error('❌ Error calling OpenRouter:', error.message);
    throw error;
  }
}

// ============================================
// MAIN APPLICATION FLOW
// ============================================

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   AI Chat with Moderation System      ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  // Create readline interface for user input
  const rl = readline.createInterface({ input, output });
  
  try {
    // STEP 1: Get user input
    console.log('💬 Ask me anything (type your question below):\n');
    const userPrompt = await rl.question('You: ');
    
    // Check if user actually typed something
    if (!userPrompt.trim()) {
      console.log('\n⚠️  You didn\'t enter anything. Please try again.');
      return;
    }
    
    // STEP 2: INPUT MODERATION
    console.log('\n🔍 Checking your input for safety...');
    if (containsBannedContent(userPrompt)) {
      console.log('\n❌ Your input violated the moderation policy.');
      console.log('Please rephrase your question without harmful content.\n');
      return;
    }
    console.log('✅ Input is safe!');
    
    // STEP 3: Call AI API
    const aiResponse = await callOpenRouter(userPrompt);
    
    // STEP 4: OUTPUT MODERATION
    console.log('🔍 Checking AI response for safety...');
    const moderationResult = moderateOutput(aiResponse);
    
    // STEP 5: Display results
    if (!moderationResult.isSafe) {
      console.log('⚠️  Warning: Response contained inappropriate content (redacted below)\n');
    } else {
      console.log('✅ Response is safe!\n');
    }
    
    console.log('═══════════════════════════════════════');
    console.log('AI Response:');
    console.log('═══════════════════════════════════════');
    console.log(moderationResult.text);
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ An error occurred:', error.message);
  } finally {
    // Always close the readline interface
    rl.close();
  }
}

// ============================================
// RUN THE APPLICATION
// ============================================

// Execute the main function
// The 'await' keyword means we wait for main() to complete
await main();

// ============================================
// 📚 EDUCATIONAL NOTES
// ============================================
/*
KEY CONCEPTS EXPLAINED:

1. **Async/Await**: 
   - 'async' makes a function return a Promise
   - 'await' pauses execution until the Promise resolves
   - Used for operations that take time (API calls, user input)

2. **Environment Variables**:
   - Store sensitive data (like API keys) outside your code
   - Accessed via process.env.VARIABLE_NAME
   - Set in terminal before running: set OPENAI_API_KEY=your-key

3. **Moderation Strategy**:
   - INPUT: Block immediately if banned content found
   - OUTPUT: Replace banned content with [REDACTED] and flag it

4. **API Request Structure**:
   - URL: Where to send the request
   - Method: POST (sending data)
   - Headers: Metadata (content type, authentication)
   - Body: The actual data (system prompt, user prompt, settings)

5. **Error Handling**:
   - try/catch blocks handle errors gracefully
   - Always inform the user what went wrong

HOW TO RUN THIS SCRIPT:
1. Install Node.js (if not already installed)
2. Save this file as app.js
3. Get a DeepSeek API key from https://platform.deepseek.com/api_keys
4. Set environment variable:
   Windows CMD: set DEEPSEEK_API_KEY=your-actual-key-here
   Windows PowerShell: $env:DEEPSEEK_API_KEY="your-actual-key-here"
5. Run: node app.js

TESTING IDEAS:
- Try a normal question: "What is the capital of France?"
- Try a banned word: "How to hack a computer?"
- Try edge cases: empty input, very long input
*/
