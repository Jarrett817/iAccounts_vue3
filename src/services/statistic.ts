import { Xhr } from './xhr';
class StatisticService extends Xhr {
  constructor() {
    super();
    this.modelPath = '/statistic';
  }

  getBalanceByTimeSlot(params: object) {
    return this.http({
      method: 'get',
      url: '/balance',
      params,
    });
  }
}

export const statisticService = new StatisticService();
