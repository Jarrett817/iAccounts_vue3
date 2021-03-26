import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { Home, Settings, Statistic, Tags } from '@/views/';
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/statistic', component: Statistic },
  { path: '/settings', component: Settings },
  { path: '/tags', component: Tags },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
