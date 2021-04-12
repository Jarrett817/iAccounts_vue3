interface ListItem {
  id: number | null;
  type: "expend" | "income";
  value: number;
  desc: string;
  tag: {
    id: number | null;
    name: string;
    icon: string;
  };
  createTime: number | undefined;
}
interface MonthlyBillItem {
  expend: number;
  income: number;
}

interface CommonDataItem {
  name: "支出" | "收入";
  xAxisVal: string;
  yAxisVal: number;
}

export { CommonDataItem, ListItem, MonthlyBillItem };
