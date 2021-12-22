/*
 * @Author: allin.zhang
 * @Date: 2021-12-20 21:34:50
 * @LastEditTime: 2021-12-20 22:40:02
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/locales/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// /*
//  * @Author: allin.zhang
//  * @Date: 2021-12-20 21:34:50
//  * @LastEditTime: 2021-12-20 21:56:25
//  * @LastEditors: allin.zhang
//  * @Description: 
//  * @FilePath: /agboville_web_vite/src/locales/index.ts
//  * 可以输入预定的版权声明、个性签名、空行等
//  */
import { createI18n } from 'vue-i18n'

import messages from './lang';
// // import { getLanguage } from '@/utils/cookies'
export const getLocale = () => {
    // 读取cookie存入的当前语言
    // const cookieLanguage = getLanguage()
    // // 如果有返回当前语言
    // if (cookieLanguage) {
    //   return cookieLanguage
    // }
    // 如果没有，获取系统语言
    const language = navigator.language.toLowerCase()
    // 获取messages 语言 遍历
    const locales = Object.keys(messages)
    for (const locale of locales) {
      // 如果messsage 包里面有系统语言返回
      if (language.indexOf(locale) > -1) {
        return locale
      }
    }
  
    // 默认语言 简体中文
    return 'zh-cn'
  }
// // const lang = require.context(`./lang`, false, /\.ts$/);
 
// // const messages:any = {};
// // lang.keys().forEach(key => {
// //     const val = lang(key).default;
// //     const name = key.replace(/(.*\/)*([^.]+).*/ig, '$2');
// //     messages[name] = val;
// // });
 
const i18n = createI18n({
    locale: getLocale(),    //默认显示的语言
    messages
});
export default i18n;