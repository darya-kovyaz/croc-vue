<template>
  <FilterItem
    title="Приоритет"
    :options="priorityOptions"
    :selected.sync="selected"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";

import FilterItem from "@/components/FilterItem.vue";
import { ITask } from "@/store/state";

@Component({
  components: { FilterItem },
})
export default class FilterCategory extends Vue {
  @State("tasks")
  tasks!: ITask[];

  @Mutation("setFilterPriority")
  setFilterPriority!: (priority: string[]) => void;

  @Action("applyFilters")
  applyFilters!: () => void;

  selected = [];

  get priorityOptions() {
    return [...new Set(this.tasks.map((task) => task.priority))];
  }

  @Watch("selected", { deep: true })
  onCategoryChange() {
    this.setFilterPriority(this.selected);
    this.applyFilters();
  }
}
</script>
