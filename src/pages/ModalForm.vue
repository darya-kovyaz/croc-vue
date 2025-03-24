<template>
  <v-dialog v-model="isOpen" max-width="600" persistent>
    <v-card class="modal">
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="taskData.title"
            label="Название"
            required
            :rules="rules.isNotEmpty"
          />

          <v-text-field v-model="taskData.description" label="Описание" />
          <div>
            <div class="modal__wrapped-forms">
              <v-text-field
                v-model="taskData.deadline"
                label="Дата"
                type="date"
                :rules="[...rules.isNotEmpty, ...rules.notInPast]"
                required
                style="max-width: 165px"
              />

              <v-select
                v-model="taskData.priority"
                label="Приоритет"
                :items="Object.values(ePriority)"
                required
                :rules="rules.isNotEmpty"
                :menu-props="{ offsetY: true }"
                style="max-width: 165px"
              />

              <v-select
                v-model="taskData.category"
                label="Категория"
                :items="Object.values(eCategory)"
                required
                :rules="rules.isNotEmpty"
                :menu-props="{ offsetY: true }"
                style="max-width: 165px"
              />
            </div>

            <v-combobox
              v-model="taskData.tags"
              label="Теги"
              multiple
              chips
              deletable-chips
            />
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn plain @click="onClose">Отменить</v-btn>
        <v-btn color="primary" @click="onAdd">
          {{ isEdit ? "Изменить" : "Добавить" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";

import { EPriority, ECategory, ITask } from "../store/state";

import _ from "lodash";
import { format } from "date-fns";

@Component({})
export default class ModalForm extends Vue {
  @Prop()
  data!: ITask;

  @Prop()
  isEdit!: boolean;

  @Prop()
  isOpen!: boolean;

  $refs!: {
    form: Vue & { validate: () => boolean };
  };

  taskData: ITask = {
    id: 0,
    title: "",
    description: "",
    deadline: "",
    priority: "",
    completed: false,
    category: "",
    tags: [],
  };

  ePriority = EPriority;
  eCategory = ECategory;

  get rules() {
    return {
      isNotEmpty: [(val: string) => !!val?.trim() || "Заполните поле"],
      notInPast: [
        (val: string) => {
          if (!val) return true;
          const today = format(new Date(), "yyyy-MM-dd");
          return val >= today || "Дата не должна быть из прошлого";
        },
      ],
    };
  }

  get isValid() {
    return this.$refs.form.validate();
  }

  onClose() {
    this.clearModal();
    this.$emit("close");
  }

  onAdd() {
    if (!this.isValid) {
      return;
    }

    if (this.isEdit) {
      this.$emit("update", this.taskData);
    } else {
      if (
        !this.taskData.title ||
        !this.taskData.priority ||
        !this.taskData.category
      ) {
        return;
      }

      const newTask = {
        ...this.taskData,
        id: Date.now(),
      };

      this.$emit("add", newTask);
    }

    this.onClose();
  }

  clearModal() {
    this.taskData = {
      id: 0,
      title: "",
      description: "",
      deadline: "",
      priority: "",
      completed: false,
      category: "",
      tags: [],
    };
  }

  mounted() {
    if (this.isEdit) {
      this.taskData = _.cloneDeep(this.data);
    }
  }
}
</script>
