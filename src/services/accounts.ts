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
  desc: string;
}
interface ResponseMsg {
  status: number;
  msg: string;
}
class AccountsService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/accounts";
  }
  getTimeSlot() {
    return this.http<{ minDate: number; maxDate: number }>({
      method: "get",
      url: "/timeSlot"
    });
  }
  getListByTimeSlot(params: ListParams) {
    return this.http<ResponseList>({
      method: "get",
      url: "/list",
      params
    });
  }
  getListByYear(params: { year: number }) {
    return this.http<{ month: number; expend: number; income: number }[]>({
      method: "get",
      url: "/monthList",
      params
    });
  }
  addAccount(body: AddParams) {
    return this.http<ResponseMsg>({
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
  updateTargetAccount(body: {
    id: number;
    type: string;
    value: number;
    desc: string;
    tagId: number;
  }) {
    return this.http<ResponseMsg>({
      method: "put",
      url: "/detail",
      body
    });
  }

  deleteTargetAccount(body: { id: number }) {
    return this.http<ResponseMsg>({
      method: "delete",
      url: "",
      body
    });
  }
}

export const accountsService = new AccountsService();
