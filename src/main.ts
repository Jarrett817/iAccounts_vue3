import { componentPlugin } from "./plugins/component-plugin";
import { vantPlugin } from "./plugins/vant-plugin";
import { createApp } from "vue";
import "amfe-flexible";
import "@/assets/style/index.scss";
import { router } from "@/router";
import { store } from "@/store";
import "@/assets/tags-icon-svg/iconfont";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vantPlugin);
app.use(componentPlugin);
app.mount("#app");
