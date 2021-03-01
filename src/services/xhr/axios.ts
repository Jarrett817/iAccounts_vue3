import axios from "axios";
class Xhr {
  baseURL = "";
  modelPath = "";
  needLoading: boolean;
  constructor() {
    this.needLoading = false;
    this.baseURL = "/gdios/gtag";
    this.modelPath = ""; // 后端 API 根路径
  }
  http(options, loading?: boolean, config?) {
    const {
      method,
      url,
      body = {},
      responseType = ""
    }: { method: string; url: string; body: object; responseType?: string } = options;
    const reqPath = this.modelPath + url;
    let params;
    if (method === "get") params = body;
    return axios({
      method,
      url: reqPath,
      data: body,
      baseURL: this.baseURL,
      params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      responseType,
      _configOpts: { loading: loading ?? this.needLoading },
      ...config
    });
  }
}
export default Xhr;
