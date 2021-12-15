import { use } from 'element-plus/es/locale';
import { ActionContext } from 'vuex';
export interface UserState {
  userId: string;
}

const state = {
  userId: "",
};
const actions = {
  setUserId(ctx: ActionContext<UserState, any>, userId: string) {
    ctx.commit("setUserId", userId);
  }
};
const mutations = {
  setUserId(state: UserState, userId: string) {
    state.userId = userId;
  }
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
