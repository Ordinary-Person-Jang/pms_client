import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
const hashCode = Date.now()
import vueDevTools from 'vite-plugin-vue-devtools'

const serverUrl = 'http://127.0.0.1:8080'

export default defineConfig(({ command, mode }) => {
  console.log('path : ', path)
  const env = loadEnv(mode, process.cwd())
  const apiBaseUrl = env.VITE_API_BASE_URL

  console.log('serverUrl: ', serverUrl, ', apiBaseUrl : ', apiBaseUrl)
  const viteConfig = {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        [apiBaseUrl]: {
          target: serverUrl,
          changeOrigin: true,
        },
      },
    },
  }

  return viteConfig
})
