import { ActionTree } from "vuex";
import { IState } from "./state";

const actions: ActionTree<IState, IState> = {
  getTasks({ commit }) {
    const tasks = localStorage.getItem("tasks");

    if (tasks) {
      commit("setTasks", JSON.parse(tasks));
    }
  },
};

export default actions;
