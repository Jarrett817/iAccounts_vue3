import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join, resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
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
          hack: `true; @import "${resolve(__dirname, 'src/style/vant.theme.less')}";`,
        },
        javascriptEnabled: true,
      },
      scss: {},
    },
  },
});
