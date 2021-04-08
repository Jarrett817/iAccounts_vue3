interface ListItem {
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

export { ListItem };
