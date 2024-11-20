import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/main.css';
import '@/style/index.less';
import 'virtual:windi.css';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app');
