# 🚀 Deploy to Vercel - Step by Step Guide

## 📋 Prerequisites
- [x] Working web app locally
- [ ] GitHub account
- [ ] Vercel account (free)

---

## 🎯 Method 1: Deploy via Vercel Dashboard (Easiest) ⭐

### **Step 1: Push to GitHub**

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI chat app"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `ai-chat-app` (or any name you like)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/ai-chat-app.git
   git branch -M main
   git push -u origin main
   ```

### **Step 2: Deploy on Vercel**

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up" (use your GitHub account)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ai-chat-app`
   - Click "Import"

3. **Configure Your Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   
4. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
     - **Name:** `OPENROUTER_API_KEY`
     - **Value:** `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`
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes... ☕
   - Done! 🎉

### **Step 3: Visit Your Live Site**

Vercel will give you a URL like:
- `https://ai-chat-app-xyz123.vercel.app`

---

## 🎯 Method 2: Deploy via Vercel CLI (Faster)

### **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**

```bash
vercel login
```

Follow the prompts to authenticate with GitHub/Email.

### **Step 3: Deploy**

```bash
vercel
```

Answer the questions:
- **Set up and deploy?** → Y
- **Which scope?** → Select your account
- **Link to existing project?** → N
- **What's your project's name?** → `ai-chat-app`
- **In which directory?** → `./` (press Enter)
- **Want to override settings?** → N

### **Step 4: Add Environment Variable**

```bash
vercel env add OPENROUTER_API_KEY
```

When prompted:
- **Value:** `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`
- **Environments:** Select all (Production, Preview, Development)

### **Step 5: Redeploy with Environment Variable**

```bash
vercel --prod
```

Your app is now live! 🚀

---

## 📝 Files I Created for Vercel

### `vercel.json` - Configuration
Tells Vercel how to build and route your app.

### `.vercelignore` - Files to Exclude
Prevents uploading unnecessary files.

---

## 🔧 After Deployment

### Your Live URL
Vercel will provide URLs like:
- **Production:** `https://ai-chat-app.vercel.app`
- **Preview:** `https://ai-chat-app-git-main-username.vercel.app`

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions

---

## 🐛 Troubleshooting

### "Module not found"
Make sure `package.json` has all dependencies:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### "Environment variable not set"
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add `OPENROUTER_API_KEY`
4. Redeploy

### App not loading
- Check Vercel deployment logs
- Verify `vercel.json` is in root directory
- Make sure `server.js` exists

### API errors on Vercel
- Verify environment variable is set correctly
- Check OpenRouter API key is valid
- Review function logs in Vercel dashboard

---

## 🔄 Updating Your Live App

### After making changes:

**Method 1: Git Push (Automatic)**
```bash
git add .
git commit -m "Update app"
git push
```
Vercel auto-deploys when you push to GitHub! ✨

**Method 2: Manual Deploy**
```bash
vercel --prod
```

---

## 💡 Pro Tips

### 1. **Use Git Branches for Testing**
```bash
git checkout -b feature-new-ui
# Make changes
git push origin feature-new-ui
```
Vercel creates preview deployments for each branch!

### 2. **Monitor Your Deployments**
- Visit: https://vercel.com/dashboard
- See real-time logs
- Check performance analytics

### 3. **Set Up Continuous Deployment**
Once connected to GitHub:
- Push = Auto Deploy
- Pull Request = Preview URL
- Merge = Production Deploy

### 4. **Environment Variables for Different Environments**
```bash
# Different API keys for dev/prod
vercel env add OPENROUTER_API_KEY production
vercel env add OPENROUTER_API_KEY preview
vercel env add OPENROUTER_API_KEY development
```

---

## 📊 Vercel Free Tier Limits

✅ **What's Included:**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Custom domains
- Preview deployments
- Serverless functions

⚠️ **Limits:**
- 100 GB bandwidth/month (plenty for starting)
- 10 seconds max function execution time
- 100 deployments per day

Perfect for this app! 🎉

---

## 🎯 Quick Commands Summary

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add OPENROUTER_API_KEY

# View logs
vercel logs

# Remove deployment
vercel rm ai-chat-app
```

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Support:** https://vercel.com/support

---

## ✅ Checklist Before Deploying

- [x] `vercel.json` created
- [x] `.vercelignore` created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Environment variable set
- [ ] Project deployed
- [ ] Live URL tested

---

**Ready to go live? Choose Method 1 or Method 2 above and follow the steps!** 🚀

*Estimated time: 5-10 minutes* ⏱️
