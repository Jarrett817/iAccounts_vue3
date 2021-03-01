import axios from 'axios';
interface Options {
  method: string;
  url: string;
  body?: object;
  params?: object;
  responseType?: string;
}
export class Xhr {
  baseURL = '';
  modelPath = '';
  constructor() {
    this.baseURL = '/iAccounts';
    this.modelPath = ''; // 后端 API 根路径
  }
  http(options: Options, config?: any) {
    const {
      method,
      url,
      body = {},
      responseType = '',
    }: { method: string; url: string; body: object; responseType?: string } = options;
    const reqPath = this.modelPath + url;
    let params;
    return axios({
      method,
      url: reqPath,
      data: body,
      baseURL: this.baseURL,
      params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      responseType,
      // 其余自定义选项
      ...config,
    });
  }
}
