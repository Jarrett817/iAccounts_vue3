import { Xhr } from "./xhr";
interface Detail {
  id: number;
  type: "expend" | "income";
  value: number;
  desc: string;
  tag: {
    id: number;
    name: string;
    icon: string;
  };
  createdAt: number;
}
interface Balance {
  expend: number;
  income: number;
}
interface ListParams {
  startTime: number;
  endTime: number;
  listType: number;
}
interface AddParams {
  createdAt: number;
  value: number;
  type: string;
  desc: string;
}
interface ResponseMsg {
  status: number;
  msg: string;
}
class BillService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/bills";
  }
  getTimeSlot() {
    return this.http<{ minDate: number; maxDate: number }>({
      method: "get",
      url: "/timeSlot"
    });
  }
  getListByTimeSlot(params: ListParams) {
    return this.http<Detail[]>({
      method: "get",
      url: "/list",
      params
    });
  }
  getBalanceByTimeSlot(params: { startTime: number; endTime: number }) {
    return this.http<Balance>({
      method: "get",
      url: "/balance",
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
  addBill(body: AddParams) {
    return this.http<ResponseMsg>({
      method: "post",
      url: "",
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
  updateTargetBill(body: {
    id: number;
    type: string;
    value: number;
    desc: string;
    tagId: number;
    createdAt: number;
  }) {
    return this.http<ResponseMsg>({
      method: "put",
      url: "",
      body
    });
  }

  deleteTargetBill(body: { id: number }) {
    return this.http<ResponseMsg>({
      method: "delete",
      url: "",
      body
    });
  }
}

export const billService = new BillService();
