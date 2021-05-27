import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/billList",
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    props: true
  },

  {
    name: "billList",
    path: "/billList",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/home/index.vue")
  },
  {
    name: "billList.detail",
    path: "/billList/detail/:id",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/detail/index.vue"),
    props: route => ({ id: route.params.id, from: route.query.from })
  },
  {
    path: "/statistic",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/statistic/index.vue")
  },
  {
    path: "/user",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/user/index.vue")
  },
  {
    name: "tags",
    path: "/tags",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/tags/index.vue")
  },
  {
    name: "tags.detail",
    path: "/tags/detail/:id",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/detail/index.vue"),
    props: route => ({
      id: route.params.id,
      mode: route.query.mode,
      type: route.query.type,
      from: route.query.from
    })
  }
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem("token")) {
  store.state.token = window.localStorage.getItem("token");
}
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/login",
        params: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
