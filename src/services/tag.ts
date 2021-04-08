import { Xhr } from "./xhr";
interface Response {
  id: number;
  name: string;
  icon: string;
}
class TagService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/tag";
  }
  getTags(params?: { type: string }) {
    return this.http<Response[]>({
      method: "get",
      url: "/list",
      params
    });
  }
}

export const tagService = new TagService();
