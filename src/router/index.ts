import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Home, User, Statistic, Tags, Detail } from "@/views/";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/billList" },
  { name: "billList", path: "/billList", component: Home },
  {
    name: "billList.detail",
    path: "/billList/detail/:id",
    component: Detail,
    props: route => ({ id: route.query.id, from: route.query.from })
  },
  { path: "/statistic", component: Statistic },
  { path: "/User", component: User },
  { name: "tags", path: "/tags", component: Tags },
  {
    name: "tags.detail",
    path: "/tags/detail/:id",
    component: Detail,
    props: route => ({ id: route.query.id, from: route.query.from })
  }
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
