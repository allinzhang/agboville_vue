/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:10:36
 * @LastEditTime: 2021-12-15 22:55:59
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/store/modules/nav.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import { use } from 'element-plus/es/locale';
import { ActionContext } from 'vuex';
import { SET_MENU } from './types';
export interface NavState {
  menu: string
}

const state = {
  menu: "",
};
const actions = {
  SET_MENU(ctx: ActionContext<NavState, any>, menu: string) {
    ctx.commit("SET_MENU", menu);
  },
};
const mutations = {
  SET_MENU(state: NavState, menu: string) {
    state.menu = menu;
  },
};
const getters = {
  
}
export default {
  namespace: true,
  state,
  actions,
  mutations,
  getters,
};
