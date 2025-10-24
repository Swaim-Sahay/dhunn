# 🔧 Fixing 404 Errors After Deployment

## Problem
Your app works on localhost but shows 404 errors after deployment. This is a common issue with Single Page Applications (SPAs).

## Root Cause
When you use React Router for client-side routing, the deployment server doesn't know how to handle routes like `/login`, `/library`, etc. It tries to find these files on the server and returns 404.

## Solutions Implemented ✅

### 1. **Vercel Deployment** (Recommended)

Created `client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Deploy Steps:**
1. Connect your GitHub repo to Vercel
2. Set Root Directory: `client`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`

### 2. **Netlify Deployment**

Created `client/netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Also created `client/public/_redirects`:
```
/* /index.html 200
```

**Deploy Steps:**
1. Drag and drop `client/dist` folder OR connect GitHub
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`

### 3. **Update Environment Variables**

For production, you MUST set the backend URL:

**In Vercel/Netlify Dashboard:**
```
VITE_API_URL=https://your-backend-url.com/api
```

Example:
- If backend is on Railway: `https://dhunn-production.up.railway.app/api`
- If backend is on Render: `https://dhunn-api.onrender.com/api`

## Quick Fix Steps

### If Already Deployed and Getting 404:

1. **Add the configuration file** (already done ✅)
   - Vercel: `client/vercel.json`
   - Netlify: `client/netlify.toml` or `client/public/_redirects`

2. **Set Environment Variable in deployment platform:**
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL/api
   ```

3. **Rebuild and redeploy:**
   ```bash
   cd client
   npm run build
   ```

4. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "fix: Add deployment configuration for SPA routing"
   git push origin main
   ```

5. **Redeploy** (automatic on Vercel/Netlify after push)

## Verify Backend URL

Make sure your backend is deployed and accessible:

```bash
# Test your backend
curl https://your-backend-url.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Dhunn API is running"
}
```

## Backend CORS Configuration

Ensure your backend allows requests from your frontend domain:

In `server/.env` (production):
```env
CLIENT_URL=https://your-frontend-url.vercel.app
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://www.your-frontend-url.vercel.app
```

## Common Issues & Solutions

### Issue 1: API calls failing (CORS)
**Solution:** Update backend `CLIENT_URL` with your frontend URL

### Issue 2: 404 on refresh
**Solution:** Use the deployment config files (already created ✅)

### Issue 3: Environment variables not working
**Solution:** 
- Ensure they start with `VITE_` prefix
- Redeploy after adding env vars
- Check deployment logs

### Issue 4: Blank page after deployment
**Solution:**
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check if backend is running

## Testing Checklist

After deploying:

- [ ] Homepage loads (https://your-app.vercel.app)
- [ ] Can navigate to /login
- [ ] Can navigate to /signup
- [ ] Can refresh on any page (no 404)
- [ ] API calls work (check Network tab)
- [ ] Can signup/login
- [ ] Backend CORS allows requests

## Example Configuration

**Frontend (Vercel):**
- URL: `https://dhunn.vercel.app`
- Env: `VITE_API_URL=https://dhunn-api.railway.app/api`

**Backend (Railway):**
- URL: `https://dhunn-api.railway.app`
- Env: `CLIENT_URL=https://dhunn.vercel.app`

## Files Created ✅

1. ✅ `client/vercel.json` - Vercel SPA routing
2. ✅ `client/netlify.toml` - Netlify configuration
3. ✅ `client/public/_redirects` - Netlify redirects

## Next Steps

1. Commit these changes to GitHub
2. Set environment variables in deployment platform
3. Trigger a new deployment
4. Test all routes

---

**Need Help?**

Check deployment logs in your hosting platform dashboard for specific errors.
