# RentGrab Blog Technical Specifications
## August 2025 Development Standards

---

## 1. Technology Stack

### 1.1 Core Framework
**Astro 4.x** - Static Site Generator
- **Why**: Zero JavaScript by default, perfect Lighthouse scores, fastest build times for content sites
- **Version**: 4.0+ (latest stable)
- **Rendering**: Static Site Generation (SSG) with selective hydration
- **Build Output**: Static HTML with optimized assets

### 1.2 Frontend Technologies

```javascript
// Package versions as of August 2025
{
  "astro": "^4.0.0",
  "@astrojs/react": "^3.0.0",      // For interactive components
  "@astrojs/tailwind": "^5.0.0",   // Styling framework
  "@astrojs/mdx": "^2.0.0",        // Enhanced markdown
  "@astrojs/sitemap": "^3.0.0",    // Automatic sitemap
  "@astrojs/rss": "^4.0.0",        // RSS feed generation
  "tailwindcss": "^3.4.0",
  "@tailwindcss/typography": "^0.5.0",
  "sharp": "^0.33.0"               // Image optimization
}
```

### 1.3 Content Management
- **Content Format**: Markdown/MDX files
- **Content Collections**: Astro's built-in type-safe collections
- **Asset Management**: Co-located with content
- **Version Control**: Git-based workflow

### 1.4 Deployment Infrastructure
- **Hosting**: Vercel Edge Network / Netlify
- **CDN**: Cloudflare (for images and assets)
- **Domain**: blog.rentgrab.com (subdomain approach)
- **SSL**: Auto-provisioned Let's Encrypt

---

## 2. Performance Requirements & Implementation

### 2.1 Core Web Vitals Targets (August 2025 Standards)

```typescript
// Performance budgets configuration
export const performanceBudgets = {
  LCP: 2500,    // Largest Contentful Paint < 2.5s
  INP: 200,     // Interaction to Next Paint < 200ms (replaced FID)
  CLS: 0.1,     // Cumulative Layout Shift < 0.1
  FCP: 1800,    // First Contentful Paint < 1.8s
  TTFB: 800,    // Time to First Byte < 800ms
  SI: 3000,     // Speed Index < 3s
};
```

### 2.2 Image Optimization Strategy

```javascript
// astro.config.mjs - Image optimization settings
export default defineConfig({
  image: {
    service: 'sharp',
    formats: ['avif', 'webp'],
    fallbackFormat: 'jpg',
    quality: 80,
    sizes: [320, 640, 768, 1024, 1280, 1920],
    domains: ['cdn.rentgrab.com'],
  }
});
```

**Implementation Requirements**:
- AVIF as primary format (50% smaller than JPEG)
- WebP as fallback (25-34% smaller)
- JPEG for maximum compatibility
- Lazy loading with native `loading="lazy"`
- Responsive images using `srcset` and `sizes`

### 2.3 Critical Performance Optimizations

```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preconnect" href="https://cdn.rentgrab.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">

<!-- Inline critical CSS -->
<style>/* Critical CSS here */</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 2.4 JavaScript Optimization

```javascript
// Component hydration strategy
---
// Only hydrate interactive components
import InteractiveSearch from './Search.tsx';
---

<!-- Static content -->
<article>{content}</article>

<!-- Selective hydration -->
<InteractiveSearch client:visible />
```

---

## 3. SEO Implementation

### 3.1 Technical SEO Requirements

```astro
---
// Base SEO configuration for all pages
const seoConfig = {
  titleTemplate: '%s | RentGrab Blog',
  defaultTitle: 'Equipment Rental Insights & Guides',
  description: 'Expert advice on equipment rental business',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'RentGrab Blog',
  },
  twitter: {
    handle: '@rentgrab',
    site: '@rentgrab',
    cardType: 'summary_large_image',
  },
};
---
```

### 3.2 Schema Markup Implementation

```javascript
// Schema generator for blog posts
function generateBlogSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.publishDate,
    dateModified: post.updateDate || post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.profileUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RentGrab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.rentgrab.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}
```

### 3.3 Mobile-First Indexing Compliance

```css
/* Mobile-first responsive design */
/* Base styles for mobile */
.container {
  width: 100%;
  padding: 1rem;
}

/* Progressive enhancement for larger screens */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Touch target requirements */
button, a, input, select, textarea {
  min-height: 48px;
  min-width: 48px;
}
```

### 3.4 URL Structure & Routing

```javascript
// URL patterns for SEO
export const urlPatterns = {
  blog: '/blog/',
  category: '/blog/[category]/',
  post: '/blog/[category]/[slug]/',
  author: '/blog/author/[name]/',
  tag: '/blog/tag/[tag]/',
  search: '/blog/search/',
};

// Redirect old URLs (if migrating)
export const redirects = {
  '/old-url': '/blog/new-url',
  '/feed': '/rss.xml',
};
```

---

## 4. Content Architecture

### 4.1 Content Collections Structure

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string().max(60),
    description: z.string().min(120).max(160),
    publishDate: z.coerce.date(),
    author: z.string(),
    category: z.enum([
      'guides',
      'industry-news',
      'success-stories',
      'tips',
      'updates'
    ]),
    
    // SEO fields
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
    
    // Content fields
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    
    // Updates
    updateDate: z.coerce.date().optional(),
    
    // E-E-A-T signals
    reviewedBy: z.string().optional(),
    expertise: z.array(z.string()).optional(),
  }),
});
```

### 4.2 Directory Structure

```
src/
├── content/
│   ├── blog/
│   │   ├── guides/
│   │   │   ├── equipment-rental-pricing.mdx
│   │   │   └── images/
│   │   ├── industry-news/
│   │   ├── success-stories/
│   │   └── _drafts/
│   ├── authors/
│   │   ├── john-doe.json
│   │   └── avatars/
│   └── config.ts
├── layouts/
│   ├── BaseLayout.astro
│   ├── BlogPostLayout.astro
│   └── CategoryLayout.astro
├── components/
│   ├── SEO.astro
│   ├── Schema.astro
│   ├── BlogCard.astro
│   └── Search.tsx (React component)
└── pages/
    ├── blog/
    │   ├── index.astro
    │   ├── [category].astro
    │   └── [...slug].astro
    ├── rss.xml.js
    └── sitemap.xml.js
```

---

## 5. Security & Privacy Implementation

### 5.1 Content Security Policy

```javascript
// CSP Headers configuration
export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.rentgrab.com",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google-analytics.com",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};
```

### 5.2 Cookie Consent Implementation

```typescript
// Cookie consent configuration
export const cookieConfig = {
  required: ['essential'],
  optional: ['analytics', 'marketing'],
  
  cookiePolicy: {
    essential: {
      name: 'Essential',
      description: 'Required for site functionality',
      cookies: ['session', 'csrf_token'],
    },
    analytics: {
      name: 'Analytics',
      description: 'Help us improve our content',
      cookies: ['_ga', '_gid', '_gat'],
      scripts: ['https://www.googletagmanager.com/gtag/js'],
    },
    marketing: {
      name: 'Marketing',
      description: 'Personalized content and ads',
      cookies: ['_fbp', '_ttp'],
    },
  },
  
  consentExpiry: 365, // days
  geoDetection: true,
};
```

### 5.3 Data Privacy Compliance

```javascript
// GDPR/CCPA compliance utilities
export const privacyCompliance = {
  // IP anonymization for GA4 (automatic in 2025)
  analytics: {
    anonymizeIp: true,
    dataRetention: '14 months',
    userDeletion: true,
  },
  
  // User rights implementation
  userRights: {
    access: '/privacy/request-data',
    deletion: '/privacy/delete-account',
    portability: '/privacy/export-data',
    optOut: '/privacy/opt-out',
  },
  
  // Consent logging
  consentLog: {
    store: 'encrypted-local-storage',
    audit: true,
    retention: '2 years',
  },
};
```

---

## 6. Accessibility Standards (WCAG 2.2)

### 6.1 Required Implementations

```css
/* WCAG 2.2 Level AA Requirements */

/* Color contrast ratios */
:root {
  --text-color: #212529;      /* 15.3:1 on white */
  --bg-color: #ffffff;
  --link-color: #0066cc;       /* 4.5:1 minimum */
  --focus-color: #0055aa;      /* 3:1 for focus indicators */
}

/* Focus indicators (WCAG 2.2 new requirement) */
:focus-visible {
  outline: 3px solid var(--focus-color);
  outline-offset: 2px;
}

/* Target sizing (WCAG 2.2 - 24x24 minimum) */
a, button, input, select, textarea {
  min-height: 24px;
  min-width: 24px;
  padding: 12px; /* Increases clickable area */
}
```

### 6.2 Semantic HTML Structure

```html
<!-- Proper heading hierarchy -->
<article>
  <h1>Article Title</h1>
  <section>
    <h2>Main Section</h2>
    <h3>Subsection</h3>
  </section>
</article>

<!-- Skip navigation -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- ARIA labels for interactive elements -->
<button aria-label="Search blog posts" aria-expanded="false">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Form accessibility -->
<label for="email">Email Address</label>
<input 
  type="email" 
  id="email" 
  required 
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">Please enter a valid email</span>
```

---

## 7. Analytics & Monitoring Setup

### 7.1 Google Analytics 4 Configuration

```javascript
// GA4 implementation with privacy compliance
export const analytics = {
  measurementId: 'G-XXXXXXXXXX',
  
  config: {
    anonymize_ip: true,          // Automatic in GA4
    cookie_flags: 'SameSite=None;Secure',
    allow_google_signals: false, // GDPR compliance
    allow_ad_personalization_signals: false,
  },
  
  // Custom events for engagement tracking
  events: {
    'article_read': {
      'article_title': 'string',
      'article_category': 'string',
      'read_time': 'number',
      'scroll_depth': 'number',
    },
    'newsletter_signup': {
      'signup_location': 'string',
      'article_context': 'string',
    },
    'search_performed': {
      'search_term': 'string',
      'results_count': 'number',
    },
  },
  
  // Enhanced measurement (automatic in GA4)
  enhancedMeasurement: {
    scrolling: true,
    outboundClicks: true,
    siteSearch: true,
    videoEngagement: true,
    fileDownloads: true,
  },
};
```

### 7.2 Core Web Vitals Monitoring

```javascript
// Web Vitals tracking implementation
import { getCLS, getFID, getLCP, getTTFB, getINP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to GA4
  gtag('event', 'web_vitals', {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_name: metric.name,
    metric_value: metric.value,
  });
}

// Track all metrics
getCLS(sendToAnalytics);
getLCP(sendToAnalytics);
getINP(sendToAnalytics);  // Replaces FID in 2025
getTTFB(sendToAnalytics);
```

---

## 8. Build & Development Configuration

### 8.1 Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://blog.rentgrab.com',
  
  integrations: [
    // Sitemap with custom configuration
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
    }),
    
    // React for interactive components
    react(),
    
    // Tailwind with custom config
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    
    // MDX for enhanced markdown
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark',
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    
    // Compression for production
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: false, // Handled by Sharp
      JavaScript: true,
      SVG: true,
    }),
  ],
  
  // Output configuration
  output: 'static',
  
  // Build optimization
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  
  // Prefetch configuration
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  
  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[hash][extname]',
        },
      },
    },
    ssr: {
      noExternal: ['@astrojs/*'],
    },
  },
});
```

### 8.2 Development Scripts

```json
// package.json scripts
{
  "scripts": {
    "dev": "astro dev --port 3000",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check && tsc --noEmit",
    "format": "prettier --write .",
    "lint": "eslint . --ext .ts,.tsx,.astro",
    "test:lighthouse": "lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json",
    "test:a11y": "pa11y http://localhost:3000",
    "analyze": "astro build && wrangler pages functions build --outdir dist",
    "content:new": "node scripts/new-post.js"
  }
}
```

### 8.3 Environment Variables

```bash
# .env.example
# Site Configuration
PUBLIC_SITE_URL=https://blog.rentgrab.com
PUBLIC_SITE_NAME="RentGrab Blog"

# Analytics
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_PLAUSIBLE_DOMAIN=blog.rentgrab.com

# API Integration
PUBLIC_API_URL=https://api.rentgrab.com
API_KEY=your-api-key

# Newsletter
CONVERTKIT_API_KEY=your-convertkit-key
CONVERTKIT_FORM_ID=your-form-id

# Image CDN
PUBLIC_CDN_URL=https://cdn.rentgrab.com

# Features flags
PUBLIC_ENABLE_COMMENTS=true
PUBLIC_ENABLE_SEARCH=true
PUBLIC_ENABLE_NEWSLETTER=true
```

---

## 9. Testing & Quality Assurance

### 9.1 Performance Testing

```javascript
// Performance budget testing
export const performanceTests = {
  lighthouse: {
    performance: 95,
    accessibility: 95,
    bestPractices: 95,
    seo: 95,
  },
  
  webPageTest: {
    firstByte: 800,
    startRender: 1500,
    speedIndex: 3000,
    fullyLoaded: 5000,
  },
  
  bundleSize: {
    js: 50000,      // 50KB max JavaScript
    css: 30000,     // 30KB max CSS
    html: 15000,    // 15KB max HTML
    total: 100000,  // 100KB total initial load
  },
};
```

### 9.2 SEO Validation

```javascript
// SEO checklist automation
export const seoChecks = {
  meta: {
    title: { min: 30, max: 60 },
    description: { min: 120, max: 160 },
  },
  
  content: {
    h1Count: 1,
    minWordCount: 300,
    minImages: 1,
    internalLinks: { min: 2, max: 10 },
    externalLinks: { min: 1, max: 5 },
  },
  
  technical: {
    canonicalRequired: true,
    schemaRequired: true,
    openGraphRequired: true,
    robotsMetaValid: true,
  },
};
```

---

## 10. Deployment Configuration

### 10.1 Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/feed",
      "destination": "/rss.xml",
      "permanent": true
    }
  ]
}
```

### 10.2 GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test Lighthouse
        run: |
          npm install -g @lhci/cli
          lhci autorun
      
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 11. Best Practices Summary

### 11.1 Content Optimization
- ✅ Write for E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust)
- ✅ Target featured snippets with structured content
- ✅ Optimize for voice search with conversational keywords
- ✅ Update content regularly (quarterly minimum)
- ✅ Include multimedia (images, videos, infographics)

### 11.2 Technical Excellence
- ✅ Achieve Core Web Vitals "Good" status
- ✅ Implement progressive enhancement
- ✅ Use semantic HTML5 elements
- ✅ Provide fallbacks for modern features
- ✅ Test across devices and browsers

### 11.3 SEO Implementation
- ✅ One H1 per page
- ✅ Descriptive meta tags under limits
- ✅ Schema markup on all content
- ✅ XML sitemap auto-generation
- ✅ Internal linking strategy

### 11.4 Performance Optimization
- ✅ Lazy load below-fold content
- ✅ Preload critical resources
- ✅ Minimize JavaScript usage
- ✅ Optimize images with modern formats
- ✅ Enable browser caching

### 11.5 Privacy & Security
- ✅ Implement cookie consent
- ✅ Use HTTPS everywhere
- ✅ Follow data minimization
- ✅ Provide user data controls
- ✅ Regular security audits

---

*Technical Specifications Version: 1.0*  
*Last Updated: August 22, 2025*  
*Framework Versions: Latest Stable as of August 2025*