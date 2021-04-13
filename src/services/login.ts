import { Xhr } from "./xhr";

class LoginService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/login";
  }
  login(body: { id: string; password: string }) {
    return this.http<{ status: number; msg: string }>({
      method: "post",
      url: "",
      body
    });
  }
}

export const loginService = new LoginService();
