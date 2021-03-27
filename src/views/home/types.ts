interface ListItem {
  name: string;
  type: string;
  value: number;
  tag: number[];
  desc: string;
}
interface ListData {
  createTime: number;
  name: string;
  value: number;
  desc: string;
}
interface GroupData {
  [key: string]: ListData[];
}
export { ListItem, ListData, GroupData };
