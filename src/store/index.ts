/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:10:36
 * @LastEditTime: 2021-12-18 15:10:49
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/store/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createStore, Mutation } from "vuex";
import user, { UserState } from "./modules/user";
import project, { ProjectState } from "./modules/project";
import nav, { NavState } from "./modules/nav";

export type StateProps = {
  user: UserState;
  project: ProjectState;
  nav: NavState;
};

const myPlugin = (store: any) => {
  // 当 store 初始化后调用
  store.subscribe((mutation: any) => {
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
