import { Xhr } from "./xhr";
interface Detail {
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
}
interface ResponseList {
  expend: number;
  income: number;
  detail: Detail[];
}
interface ListParams {
  startTime: number;
  endTime: number;
  listType: number;
}
interface AddParams {
  date: number;
  value: number;
  type: string;
  note: string;
}
interface ResponseAdd {
  status: number;
  msg: string;
}
class AccountsService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/accounts";
  }

  getListByTimeSlot(params: ListParams) {
    return this.http<ResponseList>({
      method: "get",
      url: "/",
      params
    });
  }
  addAccount(body: AddParams) {
    return this.http<ResponseAdd>({
      method: "post",
      url: "/",
      body
    });
  }
  getTargetDetail(params: { id: number }) {
    return this.http<Detail>({
      method: "get",
      url: "/detail",
      params
    });
  }
}

export const accountsService = new AccountsService();
