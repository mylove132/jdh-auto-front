import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv } from 'vite'
export default ({ command }: ConfigEnv): UserConfigExport => {
  // According to the project configuration. Can be configured in the .env file
  let prodMock = true
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        "public": path.resolve(__dirname, './public'),
        "~@": path.resolve(__dirname, './src')
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],
    server: {
      host: 'localhost',
      port: 8202,
      open: true
    }
  }
}