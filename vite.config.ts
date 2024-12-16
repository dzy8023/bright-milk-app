import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
        sassOptions: {
          silenceDeprecations: ['legacy-js-api'], // 添加此选项以静默过时警告
        },
      },
    },
  },
})
