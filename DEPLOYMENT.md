# RentGrab Blog Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] Run tests: `npm run check`
- [ ] Build locally: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Update environment variables in production
- [ ] Verify all content is reviewed and approved

### Environment Setup

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

2. **Configure production values**
   - Set `PUBLIC_GA_MEASUREMENT_ID` with your Google Analytics ID
   - Configure `PUBLIC_SENTRY_DSN` if using error monitoring
   - Update social media handles and contact emails
   - Set API endpoints if integrating with backend

### Deployment Options

#### Option 1: Railway (Recommended)

1. **Connect GitHub repository**
   - Link your repository to Railway
   - Set up automatic deployments from `master` branch

2. **Environment Variables**
   - Add all PUBLIC_* variables from `.env.example`
   - Railway automatically uses `PORT` environment variable

3. **Build Settings**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Root directory: `/`

4. **Custom Domain**
   - Add `blog.rentgrab.com` as custom domain
   - Update DNS records as instructed by Railway

#### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure domain in Vercel dashboard**

#### Option 3: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Production Features

#### Security Headers
- CSP (Content Security Policy) configured
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

#### Performance Optimizations
- Image optimization with Sharp
- CSS/JS minification
- HTML compression
- Cache headers for static assets
- Preconnect to external domains

#### SEO Setup
- robots.txt configured
- Sitemap auto-generated at `/sitemap-index.xml`
- Open Graph meta tags
- Twitter Cards
- Schema.org structured data

#### Analytics & Monitoring
- Google Analytics 4 integration
- Web Vitals tracking
- Error monitoring ready (configure Sentry DSN)
- Performance metrics collection

### Post-Deployment Verification

1. **Check Core Functionality**
   - [ ] Homepage loads correctly
   - [ ] Blog posts are accessible
   - [ ] Navigation works properly
   - [ ] Images load with proper optimization
   - [ ] Contact form (if applicable)

2. **SEO Verification**
   - [ ] Sitemap accessible at `/sitemap-index.xml`
   - [ ] robots.txt accessible at `/robots.txt`
   - [ ] Meta tags properly rendered (use social media debuggers)

3. **Performance Testing**
   - [ ] Run Lighthouse audit (target: >90 score)
   - [ ] Test Core Web Vitals
   - [ ] Verify caching headers

4. **Security Testing**
   - [ ] Check security headers (use securityheaders.com)
   - [ ] Verify HTTPS is enforced
   - [ ] Test CSP policy

### Monitoring Setup

1. **Google Search Console**
   - Submit sitemap
   - Verify domain ownership
   - Monitor indexing status

2. **Google Analytics**
   - Verify data collection
   - Set up conversion goals
   - Configure custom events

3. **Error Monitoring (Optional)**
   - Configure Sentry project
   - Set up alerts for errors
   - Monitor error rates

### Troubleshooting

#### Navigation Issues
- Ensure `serve.json` is properly configured
- Check that `cleanUrls: true` is set
- Verify static files are generated correctly

#### Build Failures
- Check Node.js version (requires 18+)
- Clear cache: `rm -rf node_modules dist`
- Reinstall dependencies: `npm ci`

#### Performance Issues
- Review image sizes and formats
- Check for blocking resources
- Verify CDN configuration
- Enable compression in hosting platform

### Maintenance

#### Content Updates
1. Add new blog posts in `src/content/blog/`
2. Follow frontmatter schema
3. Test locally before deploying
4. Commit and push to trigger deployment

#### Dependency Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Astro specifically
npm install astro@latest
```

#### Backup Strategy
- Regular GitHub repository backups
- Export Google Analytics data monthly
- Backup environment configurations

### Support

For deployment issues:
- Check Railway/Vercel/Netlify documentation
- Review Astro deployment guides
- Contact platform support for hosting issues

For application issues:
- Check error logs in hosting dashboard
- Review browser console for client-side errors
- Monitor error tracking service (if configured)