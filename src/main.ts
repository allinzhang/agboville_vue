/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:04:31
 * @LastEditTime: 2021-12-20 22:37:57
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/main.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createApp } from 'vue'
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css";
import VueClipboard from 'vue-clipboard2'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./static/ts/permission";

import "./static/styles/index.scss"; // global css
// import * as filters from './filters' // global filters
import i18n from './locales';

// register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(i18n)
  .use(VueClipboard)
  .mount("#app");