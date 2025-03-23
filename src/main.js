import { createApp } from 'vue';
import App from './App.vue';

// 引入格式化css文件
import "normalize.css";
import "@/assets/css/reset.css"

// 引入router
import router from "@/router";

// 引入状态管理库
import pinia from "@/store";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');