import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 3000,
    proxy: {
      '^/iAccounts': {
        target: 'https://www.fastmock.site/mock/eff966340c7c104aca296f8e38971d9b',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      {
        find: /^~/,
        replacement: 'node_modules/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${resolve(__dirname, 'src/assets/style/vant.theme.less')}";`,
        },
        javascriptEnabled: true,
      },
      scss: {},
    },
  },
});
