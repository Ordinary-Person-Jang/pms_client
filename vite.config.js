import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'
const hashCode = Date.now()


// import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'


export default defineConfig(({ command, mode }) => {
  console.log('path : ', path)

  const viteConfig = {
    plugins: [
      vue() // 2. 플러그인 배열에 추가
    ],
    resolve: {
      alias : {
        '@' : path.resolve(__dirname, './src')
      }
    }
  }

  return viteConfig
})
