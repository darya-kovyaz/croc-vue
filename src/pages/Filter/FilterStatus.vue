<template>
  <FilterItem
    title="Статус"
    :options="statusOptions"
    :selected.sync="selected"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Mutation } from "vuex-class";

import FilterItem from "@/components/FilterItem.vue";

@Component({
  components: { FilterItem },
})
export default class FilterCategory extends Vue {
  @Mutation("setFilterStatus")
  setFilterStatus!: (status: boolean[]) => void;

  @Action("applyFilters")
  applyFilters!: () => void;

  selected = [];

  get statusOptions() {
    return [
      { value: true, label: "Выполнено" },
      { value: false, label: "Не выполнено" },
    ];
  }

  @Watch("selected", { deep: true })
  onStatusChange() {
    this.setFilterStatus(this.selected);
    this.applyFilters();
  }
}
</script>
