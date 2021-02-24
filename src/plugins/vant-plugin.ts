import 'vant/lib/index.css';
import { Tabbar, TabbarItem, Icon, NavBar } from 'vant';
import { App } from 'vue';
const componentArray = [Tabbar, TabbarItem, Icon, NavBar];
export const vantPlugin = {
  install: (app: App) => {
    componentArray.forEach((item) => {
      app.component(item.name, item);
    });
  },
};
