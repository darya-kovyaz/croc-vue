<template>
  <div class="paging">
    <v-select
      :items="pageSizes"
      v-model="localPageSize"
      label="Показывать по"
      dense
      hide-details
      outlined
      class="paging__select"
      @change="onChangePageSize"
    />
    <v-pagination
      v-model="localCurrentPage"
      :length="totalPages"
      @input="onChangePage"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";

@Component({})
export default class Paging extends Vue {
  @Prop()
  pageSize!: number;

  @Prop()
  currentPage!: number;

  @Prop()
  totalPages!: number;

  pageSizes = [25, 50, 100];
  localPageSize = 0;
  localCurrentPage = 1;

  onChangePage(newPage: number) {
    this.$emit("change-page", newPage);
  }

  onChangePageSize(newPageSize: number) {
    this.$emit("change-page-size", newPageSize);
  }

  mounted() {
    this.localPageSize = this.pageSize;
    this.localCurrentPage = this.currentPage;
  }
}
</script>
