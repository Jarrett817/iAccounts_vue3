import { svgBuilder } from "./src/plugins/svg-plugin";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";
// https://vitejs.dev/config/

const vantConfig = {
  libraryName: "vant",
  esModule: true,
  resolveStyle: name => {
    return `vant/es/${name}/style`;
  }
};

export default defineConfig({
  plugins: [vue(), styleImport({ libs: [vantConfig] }), svgBuilder("src/assets/svg/")],
  base: "/",
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "^/iAccounts": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src"
      },
      {
        find: /^~/,
        replacement: "node_modules/"
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${resolve(__dirname, "src/assets/style/vant.theme.less")}";`
        },
        javascriptEnabled: true
      },
      scss: {}
    }
  },
  build: {
    rollupOptions: {
      input: "index.html",
      output: {
        name: "iAccounts",
        file: "iAccounts.js",
        format: "umd"
        // plugins: [terser()],
      },
      plugins: [
        // scss({ include: /\.scss$/, sass: dartSass }),
        // esbuild({
        //   include: /\.[jt]s$/,
        //   minify: process.env.NODE_ENV === 'production',
        //   target: 'es2015',
        // }),
        // vue({
        //   include: /\.vue$/,
        // }),
      ]
    }
  }
});
