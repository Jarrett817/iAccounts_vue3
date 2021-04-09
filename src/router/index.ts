import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Home, User, Statistic, Tags, BillEdit, TagEdit } from "@/views/";
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/billList/edit/:id", component: BillEdit, props: true },
  { path: "/statistic", component: Statistic },
  { path: "/User", component: User },
  { path: "/tags", component: Tags },
  { path: "/tags/edit/:id", component: TagEdit, props: true }
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
