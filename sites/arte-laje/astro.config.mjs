import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // No GitHub Pages: SITE_URL=https://dlba-solucoes.github.io e BASE_PATH=/sites/arte-laje
  site: process.env.SITE_URL ?? 'https://artelaje.com.br',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
