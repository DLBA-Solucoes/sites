import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // No GitHub Pages: SITE_URL=https://dlba-solucoes.github.io e BASE_PATH=/sites/sc-maquinas
  site: process.env.SITE_URL ?? 'https://scmaquinas.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en', es: 'es' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
