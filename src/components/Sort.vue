<template>
  <v-select
    v-model="selected"
    :items="sortOptions"
    label="Сортировать по"
    @change="onChange"
    outlined
    :menu-props="{ offsetY: true }"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";

import { ITask } from "../store/state";

@Component({})
export default class Sort extends Vue {
  @Prop()
  tasks!: ITask[];

  sortOptions = [
    { text: "Дате", value: "date" },
    { text: "Названию", value: "title" },
    { text: "Приоритету", value: "priority" },
  ];

  priorityOrder: Record<string, number> = {
    Низкий: 0,
    Средний: 1,
    Высокий: 2,
  };

  selected = "";

  onChange(value: string) {
    const sorted = this.sortTasks(this.tasks, value);
    this.$emit("sort", sorted);
  }

  sortTasks(tasks: ITask[], sortBy: string): ITask[] {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);

        case "priority": {
          return (
            this.priorityOrder[b.priority] - this.priorityOrder[a.priority]
          );
        }

        case "date":
        default: {
          const dA = new Date(a.deadline).getTime() || Infinity;
          const dB = new Date(b.deadline).getTime() || Infinity;
          return dA - dB;
        }
      }
    });
  }
}
</script>
