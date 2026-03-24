// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static', // indica que no es solo static

  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: true,
    },
  },
})
