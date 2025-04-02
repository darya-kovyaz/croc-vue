import { ActionTree } from "vuex";
import { IState } from "./state";

const actions: ActionTree<IState, IState> = {
  getTasks({ commit }) {
    const tasks = localStorage.getItem("tasks");

    if (tasks) {
      commit("setTasks", JSON.parse(tasks));
    }
  },

  applyFilters({ state }) {
    state.filteredTasks = state.tasks.filter((task) => {
      const matchesStatus =
        state.filtersApplied.completed.length === 0 ||
        state.filtersApplied.completed.includes(task.completed);

      const matchesCategory =
        state.filtersApplied.category.length === 0 ||
        state.filtersApplied.category.includes(task.category);

      const matchesPriority =
        state.filtersApplied.priority.length === 0 ||
        state.filtersApplied.priority.includes(task.priority);

      return matchesStatus && matchesCategory && matchesPriority;
    });
  },
};

export default actions;
