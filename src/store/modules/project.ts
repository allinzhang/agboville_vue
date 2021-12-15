/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:10:36
 * @LastEditTime: 2021-12-15 22:56:59
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/store/modules/project.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import { use } from 'element-plus/es/locale';
import { ActionContext } from 'vuex';
import { SET_TOKEN, SET_USER_ID } from './types';
export interface ProjectState {
  projectId: string;
}

const state = {
  projectId: ""
};
const actions = {
  SET_PROJECT_ID(ctx: ActionContext<ProjectState, any>, id: string) {
    ctx.commit("SET_PROJECT_ID", id);
  },
};
const mutations = {
  SET_PROJECT_ID(state: ProjectState, id: string) {
    state.projectId = id;
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
