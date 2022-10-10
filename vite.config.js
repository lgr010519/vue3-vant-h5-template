import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// import removeConsole from 'vite-plugin-remove-console'
// import strip from '@rollup/plugin-strip'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

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
      /**
       * removeConsole({
       *  //数组当中填写路径文件,被访问的文件不会删除console.log
       *  external:['src/components/nav-bar.vue','src/assets/styles/index.scss']
       * })
       */
      // removeConsole()
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
    },
    build: {
      rollupOptions: {}
    }
    // build: {
    //   rollupOptions: {
    //     input: 'src/main.js',
    //     output: {
    //       file: './dist/bundle.js',
    //       format: 'cjs',
    //       name: 'bundleName'
    //     },
    //     plugins: [
    //       strip({
    //         //如果不想执行该配置项时 设置为false即可
    //         // set this to `false` if you don't want to
    //         // remove debugger statements
    //         //去除debugger
    //         debugger: true,

    //         // defaults to `[ 'console.*', 'assert.*' ]`
    //         //去除文件中指定的语句
    //         functions: ['console.log', 'assert.*', 'debug', 'alert'],

    //         // set this to `false` if you're not using sourcemaps –
    //         // defaults to `true`
    //         // 代码映射信息
    //         sourceMap: true
    //       })
    //     ]
    //   }
    // },
  }
})

//  prettier-plugin-tailwindcss
//  stylelint
//  stylelint-order
//  editorconfig
