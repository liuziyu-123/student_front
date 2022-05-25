import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//取色器
import vcolorpicker from 'vcolorpicker'

import axios from 'axios'
import VueAxios from 'vue-axios'
// createApp(App).use(VueAxios,axios)

// import http, { uploadFile } from './lib/http.js';
// Vue.prototype.$http = http;
// Vue.prototype.$uploadFile = uploadFile; // 上传接口


createApp(App).use(VueAxios,axios)
.use(store).use(router).use(ElementPlus).use(vcolorpicker).mount("#app");
