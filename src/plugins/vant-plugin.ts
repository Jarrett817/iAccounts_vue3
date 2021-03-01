import 'vant/lib/index.less';
import { Tabbar, TabbarItem, Icon, NavBar, Notify } from 'vant';
import { App } from 'vue';
const componentArray = [Tabbar, TabbarItem, Icon, NavBar];
export const vantPlugin = {
  install: (app: App) => {
    componentArray.forEach((item) => {
      app.component(item.name, item);
    });
    // 全局注册Notify函数，以便使用this.$notify()
    app.use(Notify);
  },
};
