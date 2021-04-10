import { Xhr } from "./axios";
import axios from "axios";
import { Notify } from "vant";

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

export { Xhr };
