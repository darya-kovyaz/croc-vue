<template>
  <div class="task__list">
    <div>
      <div class="task__list__button">
        <v-btn class="task__addButton" @click="onOpenAddModal">
          Добавить задачу
        </v-btn>
      </div>
      <div class="task__sort">
        <div class="task__sort__sort-component">
          <Sort :tasks="tasks" @sort="onSort" />
        </div>
      </div>
    </div>

    <div v-if="!tasks.length" class="task__list__empty">
      Нет задач
      <v-icon color="red" size="medium">fa-solid fa-heart-crack</v-icon>
    </div>

    <div v-else class="task__list__component">
      <div v-for="(task, idx) in filteredTasks" :key="task.id">
        <Task
          :task="task"
          :idx="idx"
          @edit="onOpenEditModal"
          @delete="onDelete"
        />
      </div>
    </div>
    <ModalForm
      v-if="isOpen"
      :is-edit="isEdit"
      :is-open="isOpen"
      :data="selectedTask"
      @add="onAdd"
      @update="onUpdate"
      @close="onCloseModal"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Action, Mutation, State } from "vuex-class";

import Component from "vue-class-component";
import { ITask } from "../store/state";

import Task from "./Task.vue";
import ModalForm from "./ModalForm.vue";
import Sort from "../components/Sort.vue";

@Component({
  components: {
    Sort,
    ModalForm,
    Task,
  },
})
export default class Tasks extends Vue {
  @State("tasks")
  tasks!: ITask[];

  @Mutation("setTasks")
  setTasks!: (tasks: ITask[]) => void;

  @Mutation("addTask")
  addTask!: (task: ITask) => void;

  @Mutation("deleteTask")
  deleteTask!: (task: ITask) => void;

  @Mutation("updateTask")
  updateTask!: (task: ITask) => void;

  @Mutation("clearTasks")
  clearTasks!: () => void;

  @Action("getTasks")
  getTasks!: () => void;

  isOpen = false;
  isEdit = false;

  selectedTask: ITask | null = null;

  get filteredTasks() {
    return [...this.tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }

      return 0;
    });
  }

  mounted() {
    // this.clearTasks();
    this.getTasks();
  }

  onAdd(task: ITask) {
    this.addTask(task);
  }

  onUpdate(updatedTask: ITask) {
    this.updateTask(updatedTask);
  }

  onSort(sortedTasks: ITask[]) {
    this.setTasks(sortedTasks);
  }

  onDelete(task: ITask) {
    this.deleteTask(task);
  }

  onOpenAddModal() {
    this.isEdit = false;
    this.isOpen = true;
  }

  onOpenEditModal(task: ITask) {
    this.isOpen = true;
    this.isEdit = true;

    this.selectedTask = task;
  }

  onCloseModal() {
    this.isOpen = false;
  }
}
</script>
