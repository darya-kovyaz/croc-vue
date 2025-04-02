import { MutationTree } from "vuex";
import { IState, ITask } from "./state";

const mutations: MutationTree<IState> = {
  setTasks(state, tasks: ITask[]) {
    state.tasks = tasks;
    state.filteredTasks = tasks; // Заполняем и отфильтрованные задачи
  },

  clearTasks(state) {
    state.tasks = [];
    state.filteredTasks = [];
    localStorage.removeItem("tasks");
  },

  addTask(state, task: ITask) {
    state.tasks.unshift(task);
    state.filteredTasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },

  deleteTask(state, task: ITask) {
    state.tasks = state.tasks.filter((t) => t.id !== task.id);
    state.filteredTasks = state.filteredTasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },

  updateTask(state, task: ITask) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, task);
      state.filteredTasks.splice(index, 1, task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },

  setFilterStatus(state, statusFilter: boolean[]) {
    state.filtersApplied.completed = statusFilter;
  },

  setFilterCategory(state, categoryFilter: string[]) {
    state.filtersApplied.category = categoryFilter;
  },

  setFilterPriority(state, priorityFilter: string[]) {
    state.filtersApplied.priority = priorityFilter;
  },
};

export default mutations;
