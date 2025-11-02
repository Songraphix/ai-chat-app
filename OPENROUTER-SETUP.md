# 🚀 OpenRouter Setup Guide

## 🌟 What is OpenRouter?

**OpenRouter** is like a "universal remote" for AI models! Instead of getting separate API keys for OpenAI, Claude, Gemini, DeepSeek, etc., you get ONE key that works with ALL of them!

### ✨ Benefits:
- ✅ **One API key** for 100+ AI models
- ✅ **Pay-as-you-go** pricing (very affordable)
- ✅ **Easy switching** between models
- ✅ **OpenAI-compatible** format (easy to learn)
- ✅ **Free credits** to start!

---

## 🚀 Quick Setup (2 minutes)

### **Step 1: Get Your OpenRouter API Key**

1. Go to: **https://openrouter.ai/**
2. Click **"Sign In"** (use Google/GitHub)
3. Go to **"Keys"** in the menu
4. Click **"Create Key"**
5. Copy your key (looks like: `sk-or-v1-...`)

### **Step 2: Set the API Key**

**Windows Command Prompt:**
```cmd
set OPENROUTER_API_KEY=your-key-here
```

**Windows PowerShell:**
```powershell
$env:OPENROUTER_API_KEY="your-key-here"
```

### **Step 3: Run the App**

```cmd
node app.js
```

---

## 🎯 Available Models Through OpenRouter

With your ONE OpenRouter key, you can use:

| Provider | Model | Good For |
|----------|-------|----------|
| **DeepSeek** | `deepseek/deepseek-chat` | Cheap, fast, great quality |
| **OpenAI** | `openai/gpt-3.5-turbo` | Standard chatbot |
| **OpenAI** | `openai/gpt-4` | Best quality (expensive) |
| **Anthropic** | `anthropic/claude-3-opus` | Long conversations |
| **Google** | `google/gemini-pro` | Fast & free tier |
| **Meta** | `meta-llama/llama-3-8b` | Open source |

### **Current Setup:**
We're using `deepseek/deepseek-chat` - great balance of quality and price!

---

## 💡 How to Switch Models

Want to try a different AI? Just change the model name!

### **In app.js:**
```javascript
// Find this line (around line 120):
model: 'deepseek/deepseek-chat',

// Change to:
model: 'openai/gpt-3.5-turbo',  // Try OpenAI
// or
model: 'google/gemini-pro',      // Try Gemini
// or
model: 'anthropic/claude-3-sonnet', // Try Claude
```

---

## 🔑 Understanding the Code

### **OpenRouter Format:**

```javascript
{
  model: 'provider/model-name',  // Format: provider/model
  messages: [
    { role: 'system', content: 'Instructions...' },
    { role: 'user', content: 'Question?' }
  ],
  max_tokens: 500,
  temperature: 0.7
}
```

### **Special Headers:**
```javascript
headers: {
  'Authorization': `Bearer ${API_KEY}`,     // Required
  'HTTP-Referer': 'http://localhost:3000',  // Optional (for stats)
  'X-Title': 'My App'                       // Optional (for rankings)
}
```

---

## 💰 Pricing (Very Affordable!)

OpenRouter charges per token used:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| DeepSeek | $0.14 | $0.28 |
| GPT-3.5 | $0.50 | $1.50 |
| GPT-4 | $5.00 | $15.00 |
| Gemini Pro | $0.125 | $0.375 |

**What this means:**
- DeepSeek: ~750,000 words for $0.14
- You get **free credits** when you sign up!
- Perfect for learning and testing

---

## 🎓 Why This is Great for Learning

### **1. One Key, Many Models**
Learn once, use everywhere! The code works with all models.

### **2. Easy Comparison**
Want to see which AI is better? Just change one line!

### **3. Cost Effective**
Start with cheap models (DeepSeek), upgrade when needed.

### **4. Real-World Ready**
This is how production apps work - they use API gateways!

---

## 🧪 Test It Now!

### **Example 1: Ask a Question**
```cmd
C:\...\KODECAMP> set OPENROUTER_API_KEY=your-key
C:\...\KODECAMP> node app.js

You: How can I learn JavaScript in 2 weeks?
AI: Here's a structured plan...
```

### **Example 2: Try Different Models**

Edit `app.js`, change the model, and see different responses!

---

## 🆚 Comparison: Direct API vs OpenRouter

### **Direct API (what we had before):**
```
DeepSeek Key → DeepSeek API only
Gemini Key → Gemini API only
OpenAI Key → OpenAI API only
```
❌ Need multiple keys
❌ Different formats for each
❌ Hard to switch models

### **OpenRouter (what we have now):**
```
ONE OpenRouter Key → 100+ models!
```
✅ One key for everything
✅ Same format for all
✅ Easy to switch models

---

## 🐛 Troubleshooting

### "API key not found"
```cmd
set OPENROUTER_API_KEY=sk-or-v1-your-key
```

### "Model not found"
Make sure model format is: `provider/model-name`
```javascript
✅ 'deepseek/deepseek-chat'
❌ 'deepseek-chat'
```

### "Insufficient credits"
- Check your balance at: https://openrouter.ai/credits
- Add credits or use free models

### Still getting HTML errors?
- Check the URL is: `https://openrouter.ai/api/v1/chat/completions`
- Make sure API key starts with `sk-or-v1-`

---

## 📚 Resources

- **OpenRouter Dashboard:** https://openrouter.ai/
- **Model List:** https://openrouter.ai/models
- **Pricing:** https://openrouter.ai/models (see prices per model)
- **Documentation:** https://openrouter.ai/docs

---

## 🎯 Quick Commands

```cmd
# Set API key
set OPENROUTER_API_KEY=your-key

# Run app
node app.js

# Check if key is set
echo %OPENROUTER_API_KEY%
```

---

**You're all set with OpenRouter! One key to rule them all! 🎉**

Try it now:
```cmd
set OPENROUTER_API_KEY=your-key-here
node app.js
```
