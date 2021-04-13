import { Xhr } from "./xhr";
interface Response {
  id: number;
  name: string;
  icon: string;
}
interface ResponseMsg {
  status: number;
  msg: string;
}
class TagService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/tags";
  }
  getTags(params?: { type: "expend" | "income" }) {
    return this.http<Response[]>({
      method: "get",
      url: "/list",
      params
    });
  }
  getTargetDetail(params: { id: number }) {
    return this.http<{ id: number; name: string; icon: string }>({
      method: "get",
      url: "/detail",
      params
    });
  }

  deleteTargetTag(body: { id: number }) {
    return this.http<ResponseMsg>({
      method: "delete",
      url: "",
      body
    });
  }

  updateTargetTag(body: { id: number; name: string; icon: string }) {
    return this.http<ResponseMsg>({
      method: "put",
      url: "",
      body
    });
  }
}

export const tagService = new TagService();
