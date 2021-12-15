/*
 * @Author: allin.zhang
 * @Date: 2021-12-08 11:14:16
 * @LastEditTime: 2021-12-14 17:18:33
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/static/ts/permission.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import router from "../../router";
import { clearPending } from "../../api/http";

const whiteList = ["/login", "/auth-redirect"] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 在跳转路由之前，先清除所有的请求
  clearPending();
  const token = localStorage.getItem("SET_TOKEN");
  if (token) {
    if (to.path === "/login") {
      next();
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
