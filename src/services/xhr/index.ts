import { Xhr } from "./axios";
import axios from "axios";
import { Notify } from "vant";
import { router } from "@/router";
import { store } from "@/store";
type DialogType = "success" | "primary" | "danger" | "warning";
axios.interceptors.response.use(response => {
  const { result, data, msg = "请求失败" } = response?.data || {};
  if (result && result !== 0) {
    return Promise.reject(msg);
  } else if (result === 0) {
    const keyArray: DialogType[] = ["success", "primary", "danger", "warning"];
    if (data.msg) {
      Notify({ type: keyArray[data.status], message: data.msg });
    }
    return data || {};
  } else {
    // 特殊相应类型 如文件流
    return response.data || {};
  }
});
// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = "https://api.github.com";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit("logout");

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.value.path !== "/login" &&
            router.replace({
              path: "login",
              query: { redirect: router.currentRoute.value.path }
            });
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  }
);
export { Xhr };
