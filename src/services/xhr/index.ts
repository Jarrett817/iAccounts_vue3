import Vue from "vue";
import axios from "axios";
import xhr from "./axios";
import store from "@/store";
axios.interceptors.request.use(
  config => {
    config?.["_configOpts"] &&
      config?.["_configOpts"]?.loading &&
      store.dispatch("loading/updateLoadingLayout", true);
    store.dispatch("http/cancelRequestMap", config || {});
    store.dispatch("http/setRequestMap", config || {});
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    // loading 处理
    const _configOpts = response?.config?.["_configOpts"];
    if (_configOpts?.loading) {
      store.dispatch("loading/updateLoadingLayout", false);
    }

    store.dispatch("http/deleteRequestMap", response?.config);
    const { result, data, msg = "请求失败" } = response?.data || {};
    if (result && result !== 0) {
      Vue["message"]({
        type: "error",
        message: msg
      });
      return Promise.reject(msg);
    } else if (result === 0) {
      return data || {};
    } else {
      // 特殊相应类型 如文件流
      return response.data || {};
    }
  },
  error => {
    // cancel回调
    if (axios.isCancel(error)) {
      // TODO cancel单个请求后 loading状态未更新
      // ⚠️可能重复的请求应避免使用全局loading
      return Promise.reject(error);
    } else {
      let msg = "请求失败";
      try {
        const { _configOpts } = error?.config;
        msg = error?.response?.data?.msg || msg;

        // loading 处理
        if (_configOpts?.loading) {
          store.dispatch("loading/updateLoadingLayout", false);
        }
        store.dispatch("http/deleteRequestMap", error?.config);
      } catch (error) {
        store.dispatch("loading/clearLoadingLayout");
      }
      Vue["message"]({
        type: "error",
        message: msg
      });
      return Promise.reject(msg);
    }
  }
);

export default xhr;
