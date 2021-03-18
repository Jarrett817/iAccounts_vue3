import { Xhr } from './xhr';
interface Request {
  expend: number;
  income: number;
  detail: any[];
}
class StatisticService extends Xhr {
  constructor() {
    super();
    this.modelPath = '/statistic';
  }

  getBalanceByTimeSlot(params: object) {
    return this.http<Request>({
      method: 'get',
      url: '/balance',
      params,
    });
  }
}

export const statisticService = new StatisticService();
