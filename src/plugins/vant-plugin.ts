import {
  CellGroup,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Sticky,
  DropdownMenu,
  DropdownItem,
  DatetimePicker,
  Popup,
  Tab,
  Tabs,
  NumberKeyboard,
  Calendar,
  Field,
  Button,
  Divider,
  ActionSheet,
  Swipe,
  SwipeItem,
  Empty,
  Picker,
  Form,
  List,
  PullRefresh
} from "vant";
import { App } from "vue";
const componentArray = [
  CellGroup,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Sticky,
  DropdownMenu,
  DropdownItem,
  DatetimePicker,
  Popup,
  Tab,
  Tabs,
  NumberKeyboard,
  Calendar,
  Field,
  Button,
  Divider,
  ActionSheet,
  Swipe,
  SwipeItem,
  Empty,
  Picker,
  Form,
  List,
  PullRefresh
];
export const vantPlugin = {
  install: (app: App) => {
    componentArray.forEach(item => {
      let camelCase = "";
      item.name.split("-").forEach(item => {
        camelCase += item[0].toUpperCase() + item.slice(1);
      });
      app.component(camelCase, item);
    });
  }
};
