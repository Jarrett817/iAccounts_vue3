import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  base: './',
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
        },
        javascriptEnabled: true,
      },
      scss: {
        // additionalData: `@import "src/styles/vw-rem/_util.scss";
        //              @import "src/styles/vw-rem/_border.scss";`,
      },
    },
  },
});
