# Trading Truth Frontend Deployment Guide

## Overview
This frontend is now configured to work with your backend at `https://trading-truths-app-2.onrender.com`. It includes fallback to localStorage when the backend is unavailable.

## Environment Configuration

### 1. Create Environment File
Create a `.env` file in the project root with:

```bash
# Backend API Configuration
VITE_API_URL=https://trading-truths-app-2.onrender.com

# Development Settings
VITE_NODE_ENV=production

# Optional: Enable detailed logging
VITE_DEBUG=false
```

### 2. Update API URL (if needed)
If your backend URL changes, update it in `src/lib/config.ts`:

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://your-new-backend-url.com',
  // ... rest of config
};
```

## Deployment Options

### Option 1: Deploy to Render (Recommended)

1. **Prepare the project:**
   ```bash
   cd Trading-Truth-Insights-Main_Front_Page/trading-truth-insights-main
   npm install
   npm run build
   ```

2. **Connect to GitHub:**
   - Push your code to a GitHub repository
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Static Site"

3. **Configure Render:**
   - **Repository:** Select your GitHub repo
   - **Branch:** main
   - **Root Directory:** `Trading-Truth-Insights-Main_Front_Page/trading-truth-insights-main`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

4. **Environment Variables:**
   Add these in Render's environment variables section:
   ```
   VITE_API_URL=https://trading-truths-app-2.onrender.com
   VITE_NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Create Static Site"
   - Render will automatically build and deploy
   - Your site will be available at `https://your-app-name.onrender.com`

### Option 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd Trading-Truth-Insights-Main_Front_Page/trading-truth-insights-main
   vercel
   ```

3. **Set Environment Variables:**
   ```bash
   vercel env add VITE_API_URL
   # Enter: https://trading-truths-app-2.onrender.com
   
   vercel env add VITE_NODE_ENV  
   # Enter: production
   ```

4. **Redeploy with env vars:**
   ```bash
   vercel --prod
   ```

### Option 3: Deploy to Netlify

1. **Build the project:**
   ```bash
   cd Trading-Truth-Insights-Main_Front_Page/trading-truth-insights-main
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or via Netlify Dashboard:**
   - Go to [Netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Set environment variables in Site Settings

## Local Development

### 1. Install Dependencies
```bash
cd Trading-Truth-Insights-Main_Front_Page/trading-truth-insights-main
npm install
```

### 2. Create Environment File
```bash
# Create .env file
echo "VITE_API_URL=https://trading-truths-app-2.onrender.com" > .env
echo "VITE_NODE_ENV=development" >> .env
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 4. Test Production Build
```bash
npm run build
npm run preview
```

## Features Implemented

### ✅ API Integration
- **Automatic Backend Detection:** App detects if backend is online
- **Fallback to localStorage:** Works offline with local data storage
- **Real-time Status:** Shows connection status in dashboard
- **Error Handling:** Graceful error handling with user feedback

### ✅ Data Management
- **React Query:** Efficient data fetching and caching
- **Optimistic Updates:** Immediate UI updates with error rollback
- **Auto-sync:** Data automatically syncs when backend comes online

### ✅ User Experience
- **Loading States:** Shows loading indicators during data operations
- **Error Messages:** Clear error messages and recovery options
- **Offline Mode:** Full functionality even when backend is unavailable
- **Toast Notifications:** Success/error feedback for all operations

## API Endpoints Expected

The frontend expects these endpoints on your backend:

```
GET  /                          # Health check
GET  /api/dashboard             # Dashboard statistics
GET  /api/calendar              # Trading calendar data
POST /api/calendar              # Save calendar data
GET  /api/journal               # Journal entries
POST /api/journal               # Save journal entry
GET  /api/analytics/performance # Performance data
GET  /api/analytics/stats       # Analytics statistics
```

## Troubleshooting

### Backend Connection Issues
1. Check if backend URL is correct in `src/lib/config.ts`
2. Verify CORS is enabled on your backend
3. Check browser network tab for API errors
4. Ensure backend is running and accessible

### Build Issues
1. Run `npm install` to ensure all dependencies are installed
2. Check for TypeScript errors: `npm run lint`
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Environment Variables Not Working
1. Ensure `.env` file is in the correct location (project root)
2. Restart development server after adding env vars
3. Check that variables start with `VITE_` prefix

## Performance Optimization

The build is optimized with:
- **Code Splitting:** Vendor and UI libraries are split into separate chunks
- **Minification:** All code is minified for production
- **Tree Shaking:** Unused code is removed
- **Asset Optimization:** Images and static assets are optimized

## Security Considerations

- Environment variables are only accessible client-side if they start with `VITE_`
- No sensitive API keys or secrets should be stored in frontend env vars
- HTTPS is enforced for production deployments
- CORS headers are configured for secure API communication

## Next Steps

1. **Add Authentication:** Implement user login/registration
2. **Real-time Updates:** Add WebSocket support for live data
3. **Mobile App:** Consider React Native for mobile version
4. **Advanced Analytics:** Add more detailed trading analytics
5. **Data Export:** Add CSV/PDF export functionality

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure your backend is running and accessible
4. Check the network tab for failed API requests 