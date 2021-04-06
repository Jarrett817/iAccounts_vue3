import { Xhr } from "./xhr";

interface AccountParams {
  date: number;
  value: number;
  type: string;
  note: string;
}
interface Response {
  status: number;
  msg: string;
}
class AccountsService extends Xhr {
  constructor() {
    super();
    this.modelPath = "/accounts";
  }

  addAccount(body: AccountParams) {
    return this.http<Response>({
      method: "post",
      url: "/",
      body
    });
  }
}

export const accountsService = new AccountsService();
