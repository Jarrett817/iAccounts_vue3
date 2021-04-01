import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Home, User, Statistic, Tags } from "@/views/";
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/statistic", component: Statistic },
  { path: "/User", component: User },
  { path: "/tags", component: Tags }
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
