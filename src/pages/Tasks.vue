<template>
  <div>
    <v-skeleton-loader v-if="isLoading" />
    <div v-else class="task__list">
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
          <div class="task__sort__filter-component">
            <FilterComponent :filtered-tasks="tasks" />
          </div>
        </div>
      </div>

      <div v-if="!tasks.length" class="task__list__empty">
        Нет задач
        <v-icon color="red" size="medium">fa-solid fa-heart-crack</v-icon>
      </div>

      <div v-else class="task__list__component">
        <RecycleScroller
          :key="filteredTasks.length"
          :items="filteredTasks"
          :item-size="20"
          key-field="id"
        >
          <template #default="{ item: task, index: idx }">
            <Task
              :task="task"
              :idx="idx"
              @edit="onOpenEditModal"
              @delete="onDelete"
            />
          </template>
        </RecycleScroller>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Action, Mutation, State } from "vuex-class";
import Component from "vue-class-component";

import { ITask } from "../store/state";

import { RecycleScroller } from "vue-virtual-scroller";

import Task from "./Task.vue";
import ModalForm from "./ModalForm.vue";
import Sort from "../components/Sort.vue";
import FilterComponent from "../components/FilterComponent.vue";

@Component({
  components: {
    Task,
    Sort,
    ModalForm,
    FilterComponent,
    RecycleScroller,
  },
})
export default class Tasks extends Vue {
  @State("filteredTasks")
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

  isLoading = false;

  get filteredTasks() {
    return [...this.tasks].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }

  mounted() {
    this.isLoading = true;
    // this.clearTasks();
    this.getTasks();

    this.isLoading = false;
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
