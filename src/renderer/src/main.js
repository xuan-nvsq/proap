import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 设置 Axios 为全局属性
app.config.globalProperties.$http = axios;
app.use(ElementPlus);
app.use(router);
app.mount('#app');
