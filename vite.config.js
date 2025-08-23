import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: process.env.PORT || 3000
  },
  preview: {
    host: true,
    port: process.env.PORT || 3000,
    allowedHosts: [
      'blog.rentgrab.com',
      'localhost',
      '.railway.app' // Allow Railway preview URLs
    ]
  }
});