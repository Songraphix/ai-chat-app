# 🚀 Quick Start Guide - DeepSeek Edition

## ✨ Why DeepSeek is Excellent:
- ✅ **Very Affordable** - One of the cheapest AI APIs
- ✅ Fast and powerful responses
- ✅ Uses OpenAI-compatible format (easy to understand!)
- ✅ Great for learning and production

---

## 📝 Step-by-Step Setup (3 minutes)

### **Step 1: Get Your DeepSeek API Key**

1. Go to: **https://platform.deepseek.com/**
2. Sign up for an account
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy the key (it looks like: `sk-...`)

### **Step 2: Set the API Key in Your Terminal**

Open **Command Prompt (CMD)** and type:

```cmd
set DEEPSEEK_API_KEY=YOUR_ACTUAL_KEY_HERE
```

**Important:** Replace `YOUR_ACTUAL_KEY_HERE` with the key you just copied!

### **Step 3: Run the Program**

```cmd
node app.js
```

That's it! 🎉

---

## 🧪 Try These Examples:

### Example 1: Normal Question
```
You: What is artificial intelligence?
AI: Artificial intelligence (AI) is a branch of computer science...
```

### Example 2: Test Input Moderation
```
You: How to hack into systems?
Response: ❌ Your input violated the moderation policy.
```

### Example 3: Complex Question
```
You: Explain async/await in JavaScript
AI: Async/await is a syntax for handling asynchronous operations...
```

---

## 🔑 Understanding DeepSeek's Format

DeepSeek uses the **OpenAI-compatible format**, which makes it easy to learn!

### **Request Format:**
```javascript
{
  model: "deepseek-chat",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is JavaScript?" }
  ],
  max_tokens: 500,
  temperature: 0.7
}
```

### **Response Format:**
```javascript
{
  choices: [
    {
      message: {
        content: "JavaScript is a programming language..."
      }
    }
  ]
}
```

**Key Parts:**
- `model`: Which AI model to use (`deepseek-chat`)
- `messages`: Array of conversation messages
  - `system`: Instructions for the AI's behavior
  - `user`: Your actual question
- `max_tokens`: Limit how long the response can be
- `temperature`: Control creativity (0 = focused, 1 = creative)

---

## 💡 How the Code Works

```
┌──────────────────────────────────────┐
│  1. User types a question            │
└──────────────┬───────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  2. INPUT MODERATION                 │
│     Check for banned keywords        │
│     → "kill", "hack", "bomb", etc.   │
└──────────────┬───────────────────────┘
               ↓
        ✅ Safe  or  ❌ Unsafe
               ↓                ↓
    ┌──────────┘                └──────────┐
    ↓                                      ↓
┌────────────────────┐          ┌──────────────────┐
│  3. Send to        │          │  Stop & Show     │
│     DeepSeek API   │          │  Error Message   │
└────────┬───────────┘          └──────────────────┘
         ↓
┌────────────────────────────────┐
│  4. DeepSeek processes request │
│     (AI thinks & generates)    │
└────────┬───────────────────────┘
         ↓
┌──────────────────────────────────────┐
│  5. OUTPUT MODERATION                │
│     Check AI's response              │
│     Replace bad words with           │
│     [REDACTED]                       │
└──────────────┬───────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  6. Display result to user ✨        │
└──────────────────────────────────────┘
```

---

## 🆚 API Comparison

| Feature | DeepSeek | OpenAI | Gemini |
|---------|----------|--------|--------|
| **Format** | OpenAI-like | OpenAI | Google |
| **Price** | 💰 Very Cheap | 💰💰 Moderate | 💰 Free tier |
| **Speed** | ⚡⚡ Fast | ⚡⚡ Fast | ⚡⚡⚡ Very Fast |
| **Quality** | 🌟🌟🌟🌟 Great | 🌟🌟🌟🌟🌟 Excellent | 🌟🌟🌟🌟 Great |
| **Learning** | ✅ Easy | ✅ Easy | ⚠️ Different format |

**DeepSeek is perfect for learning because:**
- Uses standard OpenAI format (most tutorials use this!)
- Very affordable for experimentation
- Great performance for the price

---

## 🎯 Understanding the Code Components

### **1. Configuration (Top of file)**
```javascript
const SYSTEM_PROMPT = "You are a helpful assistant...";
const BANNED_KEYWORDS = ['kill', 'hack', 'bomb'];
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
```
**What it does:** Sets up the rules and credentials

### **2. Input Moderation**
```javascript
function containsBannedContent(text) {
  return BANNED_KEYWORDS.some(keyword => 
    text.toLowerCase().includes(keyword)
  );
}
```
**What it does:** Checks if user's input has bad words

### **3. API Call**
```javascript
async function callDeepSeek(userPrompt) {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({ /* request data */ })
  });
  return response;
}
```
**What it does:** Sends question to DeepSeek, gets answer

### **4. Output Moderation**
```javascript
function moderateOutput(text) {
  let moderatedText = text;
  BANNED_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    moderatedText = moderatedText.replace(regex, '[REDACTED]');
  });
  return { isSafe: !foundBanned, text: moderatedText };
}
```
**What it does:** Cleans AI's response if it has bad words

---

## ❓ Common Questions

### Q: Why use environment variables for API keys?
**A:** Security! If you put the key directly in code and share it on GitHub, anyone can steal it and use your account. Environment variables keep it separate and safe.

### Q: What's the difference between 'system' and 'user' messages?
**A:**
- **System message**: Instructions for HOW the AI should behave (e.g., "Be friendly and concise")
- **User message**: The actual question from the user (e.g., "What is JavaScript?")

### Q: What is temperature?
**A:** Controls creativity:
- `0.0` = Very focused, deterministic (same question = similar answer)
- `0.7` = Balanced (default)
- `1.0` = Very creative, diverse responses

### Q: What are tokens?
**A:** Pieces of words that AI processes. Roughly:
- 1 token ≈ 4 characters
- 100 tokens ≈ 75 words
- Setting `max_tokens: 500` limits response to ~375 words

---

## 🐛 Troubleshooting

### "DEEPSEEK_API_KEY not found"
**Solution:**
```cmd
set DEEPSEEK_API_KEY=your-key-here
```
Make sure to run this in the SAME terminal window where you'll run `node app.js`

### "fetch is not defined"
**Solution:** Update Node.js to version 18 or higher
```cmd
node --version
```
If it's less than 18, download from nodejs.org

### "API Error 401: Unauthorized"
**Solution:** Your API key is wrong or expired
- Check for extra spaces when copying
- Generate a new key at platform.deepseek.com

### "API Error 429: Rate Limit"
**Solution:** You're sending requests too fast
- Wait a minute
- Check your account limits

---

## 📊 DeepSeek Pricing (as of 2025)

| Model | Input | Output |
|-------|-------|--------|
| deepseek-chat | $0.14 / 1M tokens | $0.28 / 1M tokens |

**What this means:**
- 1 million input tokens ≈ 750,000 words for $0.14
- That's incredibly cheap!
- Perfect for learning and testing

---

## 🎓 Test Your Understanding

### Challenge 1: Modify the System Prompt
Try changing the system prompt to make the AI respond like a pirate:
```javascript
const SYSTEM_PROMPT = "You are a helpful pirate assistant. Always talk like a pirate!";
```

### Challenge 2: Add More Banned Words
Add "spam" to the banned keywords list:
```javascript
const BANNED_KEYWORDS = ['kill', 'hack', 'bomb', 'spam'];
```

### Challenge 3: Change Temperature
Try different temperature values:
- `temperature: 0.2` (very focused)
- `temperature: 1.5` (very creative)

See how the AI's responses change!

---

## 🚀 Next Steps

Once you understand the basics, try these improvements:

1. **Add conversation history** - Make it remember previous messages
2. **Create a web interface** - Build a simple HTML/CSS frontend
3. **Add logging** - Save conversations to a file
4. **Stream responses** - Show AI typing in real-time
5. **Add more safety checks** - Use AI-based moderation APIs

---

## 📞 Quick Reference Commands

```cmd
# Set API key
set DEEPSEEK_API_KEY=your-key

# Run main app
node app.js

# Run simple version
node simple-version.js

# Check Node.js version
node --version
```

---

## 📚 Resources

- **DeepSeek Platform:** https://platform.deepseek.com/
- **API Documentation:** https://platform.deepseek.com/api-docs/
- **DeepSeek Models:** https://www.deepseek.com/

---

**You're all set! DeepSeek is ready to use! 🎉**

Happy coding! 🚀
