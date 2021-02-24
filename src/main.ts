import { createApp } from 'vue';
import App from './App.vue';
//
import 'amfe-flexible';
import '@/util/rem';
import { router } from '@/router';
import { store } from '@/store';
import { vantPlugin } from '@/plugins/vant-plugin';
import '@/style/index.scss';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vantPlugin);
app.mount('#app');
