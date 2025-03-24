import { MutationTree } from "vuex";
import { IState, ITask } from "./state";

const mutations: MutationTree<IState> = {
  setTasks(state, tasks: ITask[]) {
    state.tasks = tasks;
  },

  clearTasks(state) {
    state.tasks = [];
    localStorage.removeItem("tasks");
  },

  addTask(state, task: ITask) {
    state.tasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },

  deleteTask(state, task: ITask) {
    state.tasks = state.tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },

  updateTask(state, task: ITask) {
    const index = state.tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      state.tasks.splice(index, 1, task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
};

export default mutations;
