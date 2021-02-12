import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [{ path: '/', component: HelloWorld }];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
