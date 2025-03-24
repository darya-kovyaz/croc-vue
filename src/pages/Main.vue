<template>
  <div class="main">
    <div class="task__caption">Task Manager</div>
    <Tasks />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";

import Tasks from "./Tasks.vue";

@Component({
  components: {
    Tasks,
  },
})
export default class Main extends Vue {}
</script>
