/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:10:36
 * @LastEditTime: 2021-12-15 22:52:48
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/store/modules/user.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import { use } from 'element-plus/es/locale';
import { ActionContext } from 'vuex';
import { SET_TOKEN, SET_USER_ID } from './types';
import { User } from '../../types/user';
export interface UserState {
  token: string;
  userId: string;
  userInfo: User
}

const state = {
  token: "",
  userId: "",
  userInfo: {},
};
const actions = {
  SET_TOKEN(ctx: ActionContext<UserState, any>, token: string) {
    ctx.commit("SET_TOKEN", token);
  },
  SET_USER_ID(ctx: ActionContext<UserState, any>, userId: string) {
    ctx.commit("SET_USER_ID", userId);
  },
  SET_USER_INFO(ctx: ActionContext<UserState, any>, userInfo: User) {
    ctx.commit("SET_USER_INFO", userInfo);
  },
};
const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token;
  },
  SET_USER_ID(state: UserState, userId: string) {
    state.userId = userId;
  },
  SET_USER_INFO(state: UserState, userInfo: User) {
    state.userInfo = userInfo;
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
