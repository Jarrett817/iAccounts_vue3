import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import { resolve } from 'path';
// https://vitejs.dev/config/

const vantConfig = {
  libraryName: 'vant',
  esModule: true,
  resolveStyle: (name) => {
    return `vant/es/${name}/style`;
  },
};

export default defineConfig({
  plugins: [vue(), styleImport({ libs: [vantConfig] })],
  base: '/',
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
