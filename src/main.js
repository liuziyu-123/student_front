import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入http
import http from './lib/http.js';
//createApp(App).prototype.$http = http;

//图标
// import {install} from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';

//取色器
import vcolorpicker from 'vcolorpicker'

import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App).use(VueAxios,axios)
.use(store).use(router).use(ElementPlus).use(vcolorpicker);
app.config.globalProperties.$http = http;
//install(app);
app.mount("#app");
