import { Xhr } from "./xhr";
interface Response {
  expend: number;
  income: number;
  detail: {
    id: number;
    name: string;
    type: "expend" | "income";
    value: number;
    desc: string;
    tag: {
      id: number;
      name: string;
      icon: string;
    };
    createTime: number;
  }[];
}
class StatisticService extends Xhr {
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

export const statisticService = new StatisticService();
