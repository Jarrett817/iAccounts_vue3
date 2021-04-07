import { Xhr } from "./xhr";
interface Response {
  expend: number;
  income: number;
  detail: any[];
}
class TagService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/statistic";
  }

  getBalanceByTimeSlot(params: object) {
    return this.http<Response>({
      method: "get",
      url: "/balance",
      params
    });
  }
}

export const tagService = new TagService();
