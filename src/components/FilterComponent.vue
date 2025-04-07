<template>
  <div class="filter-component">
    <div>
      <v-icon @click="openFilter" v-text="'fa-solid fa-filter'" />
    </div>
    <div v-if="isOpen" class="filter-component__content">
      <div class="filter-component__block">
        <component v-for="filter in filters" :is="filter" :key="filter" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import FilterCategory from "../pages/Filter/FilterCategory.vue";
import FilterStatus from "../pages/Filter/FilterStatus.vue";
import FilterPriority from "../pages/Filter/FilterPriority.vue";

@Component({
  components: {
    FilterCategory,
    FilterStatus,
    FilterPriority,
  },
})
export default class FilterComponent extends Vue {
  isOpen = false;

  filters = ["FilterCategory", "FilterStatus", "FilterPriority"];

  openFilter() {
    this.isOpen = !this.isOpen;
  }
}
</script>
