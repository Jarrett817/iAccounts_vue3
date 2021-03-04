import 'vant/lib/index.less';
import {
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Notify,
  Divider,
  Card,
  DatetimePicker,
  ActionSheet,
  DropdownMenu,
  DropdownItem,
} from 'vant';
import { App } from 'vue';
const componentArray = [
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Divider,
  Card,
  DatetimePicker,
  ActionSheet,
  DropdownMenu,
  DropdownItem,
];
export const vantPlugin = {
  install: (app: App) => {
    componentArray.forEach((item) => {
      app.component(item.name, item);
    });
    // 全局注册Notify函数，以便使用this.$notify()
    app.use(Notify);
  },
};
