import { Xhr } from './axios';
import axios from 'axios';

axios.interceptors.response.use((response) => {
  const { result, data, msg = '请求失败' } = response?.data || {};
  if (result && result !== 0) {
    return Promise.reject(msg);
  } else if (result === 0) {
    return data || {};
  } else {
    // 特殊相应类型 如文件流
    return response.data || {};
  }
});

export { Xhr };
