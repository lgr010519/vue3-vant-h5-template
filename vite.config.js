import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// import removeConsole from 'vite-plugin-remove-console'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_BASE_URL)
  return {
    base: env.VITE_BASE_URL,
    server: {
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/custom-var.scss" as *;`
        }
      }
    },
    esbuild: {
      // or rollup/plugin-strip ?
      pure: ['console.log'],
      minify: true
    }
  }
})
