import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'
import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import zipPack from 'vite-plugin-zip-pack'
import XEUtils from 'xe-utils'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: '/admin-template-v4/',
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_BUILD_TIME: XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            ...env
          }
        }
      }),
      zipPack({
        outDir: './'
      })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    server: {
      port: 8084
    },
    build: {
      rollupOptions: {
        // 不打包依赖
        external: ['echarts'],
        plugins: [
          // 不打包依赖映射的对象
          externalGlobals({
            echarts: 'echarts'
          })
        ]
      }
    }
  }
}
