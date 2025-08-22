import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
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
    
    // React for interactive components only
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
  ],
  
  // Static output for best performance
  output: 'static',
  
  // Image optimization settings
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    domains: ['cdn.rentgrab.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
  
  // Build optimization
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  
  // Prefetch configuration for performance
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