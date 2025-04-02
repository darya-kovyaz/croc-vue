<template>
  <div>
    <div class="filter-component__item" @click="showSection">
      <div class="filter-component__item__element">
        {{ title }}
      </div>
      <v-icon>
        {{ isShowSection ? "mdi-chevron-up" : "mdi-chevron-down" }}
      </v-icon>
    </div>
    <div v-if="isShowSection">
      <v-checkbox
        v-model="selectedValues"
        v-for="(option, idx) in options"
        :key="idx"
        :label="option.label ?? option"
        :value="option.value ?? option"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, PropSync } from "vue-property-decorator";

import Component from "vue-class-component";

import { IFilter } from "../store/state";

@Component({
  components: {},
})
export default class FilterItem extends Vue {
  @Prop()
  title!: string;

  @Prop()
  options!: IFilter;

  @PropSync("selected")
  selectedValues!: string[] | boolean[];

  isShowSection = false;

  showSection() {
    this.isShowSection = !this.isShowSection;
  }
}
</script>
