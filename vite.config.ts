import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
        '/api': { // 匹配请求路径，'Access-Control-Allow-Origin': '*'
            target: 'https://itunes.apple.com/hk', // 代理的目标地址
             // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
            changeOrigin: true,
            // secure: true, // 是否https接口
            // ws: true, // 是否代理websockets
            rewrite: (path) => path.replace(/^\/api/, '') 
          }
        }
      }
})

