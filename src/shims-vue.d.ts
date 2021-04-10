// 解决rollup打包时报错找不到.vue文件
declare module '*.vue' {
  import { Component } from 'vue';
  const component: Component;
  export default component;
}
