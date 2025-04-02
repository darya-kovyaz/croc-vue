<template>
  <FilterItem
    title="Категория"
    :options="categoryOptions"
    :selected.sync="selected"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";

import FilterItem from "../../components/FilterItem.vue";
import { ITask } from "../../store/state";

@Component({
  components: { FilterItem },
})
export default class FilterCategory extends Vue {
  @State("tasks")
  tasks!: ITask[];

  @Mutation("setFilterCategory")
  setFilterCategory!: (category: string[]) => void;

  @Action("applyFilters")
  applyFilters!: () => void;

  selected = [];

  get categoryOptions() {
    return [...new Set(this.tasks.map((task) => task.category))];
  }

  @Watch("selected", { deep: true })
  onCategoryChange() {
    this.setFilterCategory(this.selected);
    this.applyFilters();
  }
}
</script>
