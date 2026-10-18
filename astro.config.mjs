import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { scrollableTables } from './src/lib/markdown-tables.mjs';

export default defineConfig({
  site: 'https://fernandoghg.com',
  output: 'static',
  markdown: { processor: satteri({ hastPlugins: [scrollableTables] }) },
  build: { inlineStylesheets: 'never' },
});
