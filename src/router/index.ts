import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Home, User, Statistic, Tags, Edit } from "@/views/";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/billList" },
  { path: "/billList", component: Home },
  { path: "/billList/edit/:id", component: Edit, props: route => ({ from: route.query.from }) },
  { path: "/statistic", component: Statistic },
  { path: "/User", component: User },
  { path: "/tags", component: Tags },
  { path: "/tags/edit/:id", component: Edit, props: route => ({ from: route.query.from }) }
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
