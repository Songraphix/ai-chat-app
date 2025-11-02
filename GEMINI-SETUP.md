# 🚀 Quick Start Guide - Google Gemini Edition

## ✨ Why Gemini is Great for Learning:
- ✅ **FREE** generous tier (60 requests/minute)
- ✅ Very fast responses
- ✅ No credit card required to start
- ✅ Easy to set up

---

## 📝 Step-by-Step Setup (5 minutes)

### **Step 1: Get Your Free API Key**

1. Go to: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (it looks like: `AIzaSyABC123...`)

### **Step 2: Set the API Key in Your Terminal**

Open **Command Prompt (CMD)** and type:

```cmd
set GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE
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
You: What is JavaScript?
AI: JavaScript is a programming language...
```

### Example 2: Test Input Moderation
```
You: How to hack a website?
Response: Your input violated the moderation policy.
```

### Example 3: Test Empty Input
```
You: [just press Enter]
Response: Warning about empty input
```

---

## 🔑 Understanding the Key Changes (OpenAI vs Gemini)

### **OpenAI Format:**
```javascript
{
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are..." },
    { role: "user", content: "Question?" }
  ]
}
```

### **Gemini Format:**
```javascript
{
  contents: [{
    parts: [{
      text: "You are...\n\nUser: Question?"
    }]
  }]
}
```

**Main Differences:**
1. **OpenAI**: Separates system/user messages
2. **Gemini**: Combines them into one text field
3. **OpenAI**: API key in Authorization header
4. **Gemini**: API key in the URL

---

## 💡 What the Code Does (Simple Explanation)

```
┌─────────────────────────────────────┐
│  1. You type a question             │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  2. Check: Is it safe?              │
│     → Scan for banned words         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  3. Send to Google Gemini           │
│     → Include system prompt         │
│     → Include your question         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  4. Gemini thinks and responds      │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  5. Check response: Is it safe?     │
│     → Replace bad words with        │
│       [REDACTED]                    │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  6. Show you the answer! ✨         │
└─────────────────────────────────────┘
```

---

## ❓ Common Issues & Solutions

### "GEMINI_API_KEY not found"
**Problem:** Environment variable not set  
**Solution:** Run `set GEMINI_API_KEY=your-key` in the SAME terminal window

### "fetch is not defined"
**Problem:** Node.js version too old  
**Solution:** Update to Node.js 18+ from nodejs.org

### "API Error 400"
**Problem:** Invalid API key  
**Solution:** Double-check you copied the key correctly (no extra spaces!)

### Can't see output
**Problem:** Terminal closed too fast  
**Solution:** Add `pause` after running: `node app.js && pause`

---

## 🎯 Test Your Understanding

Try to answer these questions by looking at the code:

1. **Where is the system prompt defined?**
   <details>
   <summary>Answer</summary>
   In the SYSTEM_PROMPT constant at the top of app.js
   </details>

2. **What happens if input contains "hack"?**
   <details>
   <summary>Answer</summary>
   The program stops immediately and shows: "Your input violated the moderation policy."
   </details>

3. **What does 'await' do?**
   <details>
   <summary>Answer</summary>
   It waits for a slow operation (like API call) to finish before continuing
   </details>

4. **Where does the API key get stored?**
   <details>
   <summary>Answer</summary>
   In an environment variable (process.env.GEMINI_API_KEY)
   </details>

---

## 📊 Gemini Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| Requests per minute | 60 |
| Requests per day | 1,500 |
| Cost | FREE ✨ |
| Credit card needed | NO ❌ |

**That's PLENTY for learning and testing!**

---

## 🚀 Next Steps

Once you understand this code, try:

1. ✅ Add more banned keywords
2. ✅ Change the system prompt to make the AI funny/serious/etc
3. ✅ Add a loop to ask multiple questions
4. ✅ Save the conversation history to a file
5. ✅ Create a web version with HTML/CSS

---

## 📞 Quick Reference

**Get API Key:** https://makersuite.google.com/app/apikey  
**Set API Key:** `set GEMINI_API_KEY=your-key`  
**Run Program:** `node app.js`  
**Check Node Version:** `node --version` (need 18+)

---

**You're all set! Happy coding! 🎉**
