import axios from "axios";
interface Options {
  method: string;
  url: string;
  body?: object;
  params?: object;
  responseType?: string;
}
export class Xhr {
  baseURL = "";
  modelPath = "";
  constructor() {
    this.baseURL = "http://124.221.212.56:7001/iAccounts/api/v1";
    this.modelPath = ""; // 后端 API 根路径
  }
  http<T>(options: Options, config?: any) {
    const {
      method,
      url,
      body = {},
      params = {},
      responseType = ""
    }: {
      method: string;
      url: string;
      params?: object;
      body?: object;
      responseType?: string;
    } = options;
    const reqPath = this.modelPath + url;
    return (axios({
      method,
      url: reqPath,
      data: body,
      baseURL: this.baseURL,
      params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      responseType,
      // 其余自定义选项
      ...config
    }) as unknown) as Promise<T>;
  }
}
