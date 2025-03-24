import Vue from "vue";
import Vuex from "vuex";

import state, { IState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store<IState>({
  actions,
  getters,
  mutations,
  state,
});
