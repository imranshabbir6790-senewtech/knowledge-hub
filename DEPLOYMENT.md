# Deployment Checklist for Vercel

## Pre-Deployment

- [x] Environment variables configured
- [x] Production build tested locally
- [x] All images optimized and in `/public/`
- [x] Meta tags and SEO configured
- [x] Error boundaries implemented
- [x] 404 page styled
- [x] vercel.json configured
- [ ] Update domain in `index.html` og:url tags
- [ ] Update analytics IDs (if using)
- [ ] Test all routes work correctly

## Deploy Steps

### 1. Build and Test Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and test all features.

### 2. Push to GitHub

```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click Deploy

**Option B: Via CLI**
```bash
npx vercel
# Follow prompts
# For production:
npx vercel --prod
```

### 4. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update URLs in code and environment variables

### 5. Post-Deployment

- [ ] Test all pages on live URL
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test authentication flow
- [ ] Check console for errors
- [ ] Test 404 page
- [ ] Verify meta tags with [metatags.io](https://metatags.io)
- [ ] Test page load speed with [PageSpeed Insights](https://pagespeed.web.dev)

## Environment Variables on Vercel

Go to Project Settings → Environment Variables and add:

```
VITE_APP_NAME=BookHub
VITE_APP_URL=https://your-domain.vercel.app
```

## Monitoring

- Check Vercel Analytics dashboard
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor Core Web Vitals

## Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Run `npm install` locally
- Check for TypeScript errors: `npm run type-check`

### 404 on Refresh
- Verify `vercel.json` is present
- Check rewrites configuration

### Images Not Loading
- Ensure images are in `/public/` directory
- Check image paths are correct (no `/public/` prefix needed)
- Verify image names match exactly (case-sensitive)

### Slow Load Times
- Run `npm run build` and check bundle size
- Optimize images with tools like TinyPNG
- Consider lazy loading for images

## Performance Optimization

✅ Code splitting enabled
✅ Asset caching configured
✅ Vendor chunks separated
✅ CSS minified
✅ Tree shaking enabled

## Security Headers

The following headers are configured in `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

## Next Steps After Deployment

1. **Analytics**: Add Google Analytics or Plausible
2. **Monitoring**: Set up Sentry for error tracking
3. **SEO**: Submit sitemap to Google Search Console
4. **Performance**: Monitor with Lighthouse CI
5. **Backend**: Connect to your backend API
6. **Database**: Set up database for user data
7. **Email**: Configure email service for notifications

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review build output in Vercel dashboard
3. Contact Vercel support if needed

---

Good luck with your deployment! 🚀
