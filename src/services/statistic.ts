import { Xhr } from "./xhr";
interface Response {
  expend: number;
  income: number;
  detail: any[];
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
