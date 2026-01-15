import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv, ProxyOptions } from 'vite'
import path from 'path'
const hashCode = Date.now()
import vueDevTools from 'vite-plugin-vue-devtools'
import { IncomingMessage, ServerResponse } from 'node:http'

const serverUrl = 'http://127.0.0.1:8080'

export default defineConfig(({ command, mode }) => {
  // console.log('path : ', path)
  const env = loadEnv(mode, process.cwd())
  const apiBaseUrl = env.VITE_API_BASE_URL

  console.log('serverUrl: ', serverUrl, ', apiBaseUrl : ', apiBaseUrl)
  type ProxyServer = Parameters<NonNullable<ProxyOptions['configure']>>[0]

  const viteConfig = {
    plugins: [vue(), vueDevTools()],
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

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          configure: (proxy: any, options: ProxyOptions) => {
            console.log('Proxy : ', proxy)
            // proxy.on(
            //   'proxyReq',
            //   (proxyReq: ClientRequest, req: IncomingMessage, res: ServerResponse) => {
            //      console.log('[proxyReq]', req.method, req.url)
            //   },
            // )
            //
            // proxy.on(
            //   'proxyRes',
            //   (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => {
            //      console.log('[proxyRes]', req.method, req.url, 'status:', proxyRes && proxyRes.statusCode)
            //   },
            // )

            proxy.on(
              'error',
              (err: Error & { code?: string }, req: IncomingMessage, res: ServerResponse) => {
                if (err.code === 'ECONNREFUSED') {
                  res.writeHead(500, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ code: 'PROXY_NETWORK_ERROR' }))
                }
              },
            )
          },
        },
      },
    },
  }

  return viteConfig
})
