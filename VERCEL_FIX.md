# 🚨 Vercel "DEPLOYMENT_NOT_FOUND" Error - Complete Fix Guide

## Error Message
```
404: NOT_FOUND
Code: DEPLOYMENT_NOT_FOUND
ID: bom1::bmdql-...
```

This error means Vercel cannot find your deployment. Here's how to fix it:

---

## Solution 1: Redeploy from Scratch (Recommended)

### Step 1: Delete Existing Deployment (if any)
1. Go to https://vercel.com/dashboard
2. Find your project
3. Delete it completely

### Step 2: Create New Deployment

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Add New..." → "Project"
   - Select GitHub
   - Find `Swaim-Sahay/dhunn`
   - Click "Import"

3. **Configure Project**:
   ```
   Project Name: dhunn
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables** (CRITICAL):
   Click "Environment Variables" and add:
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.com/api
   ```
   
   **Important**: Replace `your-backend-url.com` with your actual backend URL!
   
   Example values:
   - Railway: `https://dhunn-production.up.railway.app/api`
   - Render: `https://dhunn-api.onrender.com/api`
   - Heroku: `https://dhunn-api.herokuapp.com/api`

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? dhunn
# - In which directory is your code located? ./
# - Want to override settings? Yes
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Development Command: npm run dev

# Set environment variable
vercel env add VITE_API_URL production
# When prompted, enter: https://your-backend-url.com/api

# Deploy to production
vercel --prod
```

---

## Solution 2: Fix Existing Deployment

### Check Current Settings

1. **Go to Project Settings**:
   - Vercel Dashboard → Your Project → Settings

2. **Verify Build Settings**:
   ```
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Check Environment Variables**:
   - Settings → Environment Variables
   - Ensure `VITE_API_URL` exists with correct backend URL

4. **Redeploy**:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## Solution 3: Local Build Test

Before deploying, test the build locally:

```bash
cd client

# Set environment variable
export VITE_API_URL=https://your-backend-url.com/api

# Build
npm run build

# Preview
npm run preview

# Visit http://localhost:4173
# Test all routes work
```

If local build fails, fix errors before deploying to Vercel.

---

## Common Issues & Fixes

### Issue 1: Build Fails on Vercel

**Check Vercel Build Logs**:
- Go to Deployments → Failed deployment → View Build Logs
- Look for error messages

**Common Causes**:
- Missing dependencies in `package.json`
- Build errors in code
- Wrong Node version

**Fix**:
```json
// Add to client/package.json
{
  "engines": {
    "node": "18.x"
  }
}
```

### Issue 2: Backend URL Not Set

**Symptoms**: App loads but API calls fail

**Fix**:
1. Go to Project → Settings → Environment Variables
2. Add `VITE_API_URL` with your backend URL
3. Redeploy

### Issue 3: CORS Errors

**Fix Backend**:
```env
# In your backend .env (Railway/Render/etc.)
CLIENT_URL=https://your-vercel-app.vercel.app
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

Then redeploy backend.

### Issue 4: Wrong Root Directory

**Fix**:
1. Settings → General → Root Directory
2. Change to: `client`
3. Save and redeploy

---

## Correct File Structure for Vercel

Your project should look like this:

```
dhunn/
├── client/              ← Root directory for Vercel
│   ├── dist/           ← Generated after build
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json     ✅ Already created
│   └── .env.production
└── server/
```

---

## Vercel.json Configuration

Ensure `client/vercel.json` has this content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

✅ This file already exists in your project.

---

## Step-by-Step Checklist

- [ ] Delete old deployment from Vercel dashboard
- [ ] Create new project in Vercel
- [ ] Import from GitHub (Swaim-Sahay/dhunn)
- [ ] Set Root Directory to `client`
- [ ] Set Build Command to `npm run build`
- [ ] Set Output Directory to `dist`
- [ ] Add environment variable `VITE_API_URL`
- [ ] Deploy
- [ ] Wait for build to complete
- [ ] Test deployment URL
- [ ] Update backend CORS with new frontend URL
- [ ] Test all features work

---

## After Successful Deployment

1. **Get Your URLs**:
   - Frontend: `https://your-project.vercel.app`
   - Backend: `https://your-backend.up.railway.app`

2. **Update Backend CORS**:
   ```env
   CLIENT_URL=https://your-project.vercel.app
   ```

3. **Test Everything**:
   - [ ] Homepage loads
   - [ ] Can navigate to all routes
   - [ ] Can signup/login
   - [ ] API calls work
   - [ ] No console errors

---

## Alternative: Deploy to Netlify Instead

If Vercel continues to have issues:

```bash
cd client
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Set environment variable in Netlify dashboard
# VITE_API_URL = https://your-backend-url.com/api
```

---

## Get Help

If still having issues:

1. **Check Vercel Build Logs**:
   - Dashboard → Deployments → Click failed deployment
   - Look for specific error messages

2. **Check Browser Console**:
   - F12 → Console tab
   - Look for errors

3. **Verify Backend is Running**:
   ```bash
   curl https://your-backend-url.com/api/health
   ```

4. **Common URLs**:
   - Vercel Dashboard: https://vercel.com/dashboard
   - Build Logs: In deployment details
   - Environment Variables: Settings → Environment Variables

---

## Quick Commands

```bash
# Test local build
cd client && npm run build && npm run preview

# Deploy with Vercel CLI
cd client && vercel --prod

# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

---

**The DEPLOYMENT_NOT_FOUND error is usually fixed by doing a fresh deployment with correct settings.** Follow Option A above for the easiest solution.
