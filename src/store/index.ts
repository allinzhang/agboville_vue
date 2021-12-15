/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:10:36
 * @LastEditTime: 2021-12-15 23:00:50
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/store/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createStore } from "vuex";
import user, { UserState } from "./modules/user";
import project, { ProjectState } from "./modules/project";
import nav, { NavState } from "./modules/nav";

export type StateProps = {
  user: UserState;
  project: ProjectState;
  nav: NavState;
};

const myPlugin = (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    console.log("store.subscribe", mutation)
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    sessionStorage.setItem(mutation.type, mutation.payload);
  })
}

export default createStore<StateProps>({
  modules: {
    user,
    project,
    nav,
  },
  plugins: [
    myPlugin
  ]
});
