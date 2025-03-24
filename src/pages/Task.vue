<template>
  <div
    @mouseover="hoverIdx = idx"
    @mouseleave="hoverIdx = null"
    class="task__list__item-component"
  >
    <div class="task__list__item-component__icons">
      <div>
        <v-icon v-show="hoverIdx === idx" size="medium" @click="onEdit">
          fa-solid fa-pen
        </v-icon>
      </div>
      <div>
        <v-icon v-show="hoverIdx === idx" size="medium" @click="onDelete">
          fa-solid fa-trash
        </v-icon>
      </div>
    </div>

    <div class="task__item">
      <div class="task__item__header">
        <v-checkbox
          v-model="task.completed"
          :label="task.title"
          class="task__title"
        />
        <div class="task__item__header--icons">
          <v-icon :color="getIcon(task.priority)" size="medium">
            fa-circle-exclamation
          </v-icon>
        </div>
      </div>
      <div class="task__subTitle">
        {{ task.description }}
      </div>
      <div v-if="task.tags.length" class="task__item__body__tags">
        <div v-for="tag in task.tags" :key="tag" class="task__item__body__tag">
          {{ tag }}
        </div>
      </div>
      <div class="task__item__body--deadline">
        <div class="task__item__body--deadline--deadlineAndCategory">
          <div
            class="task__item__body--deadline--deadlineAndCategory--category"
          >
            {{ formattedDeadline ? `${task.category} -&nbsp;` : task.category }}
          </div>
          <div
            class="task__item__body--deadline--text"
            :class="{ overdue: isOverdue }"
          >
            {{ formattedDeadline }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";

import { formatDistanceToNow, isPast } from "date-fns";
import { ru } from "date-fns/locale";

import Component from "vue-class-component";
import { ITask } from "../store/state";

@Component({
  components: {},
})
export default class Tasks extends Vue {
  @Prop()
  task!: ITask;

  @Prop()
  idx!: number;

  hoverIdx: number | null = null;

  get isOverdue() {
    const { completed, deadline } = this.task;

    if (completed) {
      return false;
    }

    return isPast(deadline);
  }

  get formattedDeadline() {
    const { completed, deadline } = this.task;

    if (deadline) {
      if (!completed) {
        return isPast(deadline)
          ? `просрочено ${formatDistanceToNow(deadline, { locale: ru })} назад`
          : `осталось ${formatDistanceToNow(deadline, { locale: ru })}`;
      }
    }

    return "";
  }

  onEdit() {
    this.$emit("edit", this.task);
  }

  onDelete() {
    this.$emit("delete", this.task);
  }

  getIcon(category: string) {
    const colors: Record<string, string> = {
      Низкий: "green",
      Средний: "orange",
      Высокий: "red",
    };

    return colors[category];
  }
}
</script>
