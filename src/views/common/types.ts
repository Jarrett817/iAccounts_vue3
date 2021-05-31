interface ListItem {
  id: number | null;
  type: "expend" | "income" | "";
  value: number;
  desc: string;
  tag: {
    name: string;
    icon: string;
  };
  createdAt: number | undefined;
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
