import { defineConfig } from 'astro/config';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  vite: {
    envDir: './env',
  },
  integrations: [
    /* sentry(),  */ spotlightjs(),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});
