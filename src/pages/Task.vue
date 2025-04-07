<template>
  <div
    @mouseover="hoverIdx = idx"
    @mouseleave="hoverIdx = null"
    class="task__list__item-component"
  >
    <div class="task__list__item-component__icons">
      <div>
        <v-icon
          v-show="hoverIdx === idx"
          size="medium"
          v-text="'fa-solid fa-pen'"
          @click="onEdit"
        />
      </div>
      <div>
        <v-icon
          v-show="hoverIdx === idx"
          size="medium"
          v-text="'fa-solid fa-trash'"
          @click="onDelete"
        />
      </div>
    </div>

    <div class="task__item" :class="{ completed: task.completed }">
      <div class="task__item__header">
        <v-checkbox
          v-model="task.completed"
          :label="task.title"
          class="task__title"
          :class="{ completed: task.completed }"
          color="black"
        />
        <div class="task__item__header--icons">
          <v-icon
            :color="!task.completed ? getIcon(task.priority) : 'gray'"
            size="medium"
            v-text="'fa-circle-exclamation'"
          />
        </div>
      </div>
      <div class="task__subTitle" :class="{ completed: task.completed }">
        {{ task.description }}
      </div>
      <div v-if="task.tags.length" class="task__item__body__tags">
        <div v-for="tag in task.tags" :key="tag" class="task__item__body__tag">
          {{ tag }}
        </div>
      </div>
      <div class="task__item__body--deadline">
        <div
          class="task__item__body--deadline--deadlineAndCategory"
          :class="{ completed: task.completed }"
        >
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

import { formatDistanceToNow, isPast, format } from "date-fns";
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

    const formatDeadline = format(deadline, "dd.MM.yyyy", { locale: ru });

    if (deadline) {
      if (!completed) {
        return isPast(deadline)
          ? `просрочено ${formatDistanceToNow(deadline, {
              locale: ru,
            })} назад (${formatDeadline})`
          : `осталось ${formatDistanceToNow(deadline, {
              locale: ru,
            })} (${formatDeadline})`;
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
