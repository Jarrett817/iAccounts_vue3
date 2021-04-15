import { Xhr } from "./xhr";

class LoginService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/login";
  }
  login(body: { id: string; password: string }) {
    return this.http<{ status: number; msg: string; token?: string }>({
      method: "post",
      url: "",
      body
    });
  }
  register(body: { id: string; password: string }) {
    return this.http<{ status: number; msg: string }>({
      method: "post",
      url: "/register",
      body
    });
  }
}

export const loginService = new LoginService();
