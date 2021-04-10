interface ListItem {
  id: number | null;
  type: "expend" | "income" | "";
  value: number;
  desc: string;
  tag: {
    id: number | null;
    name: string;
    icon: string;
  };
  createTime: number | undefined;
}

export { ListItem };
