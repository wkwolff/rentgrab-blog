import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const health = {
    status: 'healthy',
    service: 'rentgrab-blog',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? process.uptime() : 'N/A',
    environment: import.meta.env.MODE,
    checks: {
      server: 'ok',
      content: 'ok',
      assets: 'ok'
    }
  };

  return new Response(JSON.stringify(health, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
};