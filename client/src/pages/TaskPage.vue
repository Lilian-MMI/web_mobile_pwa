<template>
  <q-page class="q-pa-md">
    <q-item-section>
      <div>
        <q-item-label class="text-weight-medium text-grey">Tâche</q-item-label>
        <q-item-label class="text-weight-bold" style="font-size: 1.3rem">{{
          task.title
        }}</q-item-label>
      </div>

      <div class="q-my-xl">
        <q-item-label class="text-weight-medium text-grey"
          >Description</q-item-label
        >
        <q-item-label class="text-weight-bold">{{
          task.description
        }}</q-item-label>
      </div>

      <div>
        <q-item-label class="text-weight-medium text-grey"
          >Terminée</q-item-label
        >
        <q-item-label class="text-weight-bold">{{
          task.done ? 'Oui' : 'Non'
        }}</q-item-label>
      </div>
    </q-item-section>

    <q-dialog v-model="isDialogTaskOptionsOpen" :position="'bottom'">
      <q-card>
        <q-card-section class="flex justify-between">
          <q-item-label class="text-bold q-mt-xs" style="font-size: 1rem"
            >Tâche options</q-item-label
          >
          <q-icon
            name="close"
            size="2em"
            color="grey"
            @click="dialogsStore.handleDialogOptionsOpen('task')"
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="column">
          <q-btn
            label="Modifier"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="$router.push(`/todos/${id}/tasks/${taskId}/edit`)"
          />
          <q-btn
            label="Déplacer la tâche"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="isShowingDialogTaskMove = true"
          />
          <q-btn
            label="Supprimer"
            flat
            no-caps
            color="negative"
            class="q-mb-md items-start"
            @click="isShowingDialogTaskDelete = true"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isShowingDialogTaskDelete"
      :position="'standard'"
      full-width
    >
      <q-card>
        <q-card-section class="flex justify-end">
          <q-icon
            name="close"
            size="1.5em"
            color="grey"
            @click="isShowingDialogTaskDelete = false"
          />
        </q-card-section>

        <q-item-label
          class="text-bold q-mt-l text-center"
          style="font-size: 1rem"
          >Supprimer la tâche</q-item-label
        >

        <p class="text-center q-ma-md">
          Vous êtes sur le point de supprimer votre tâche êtes vous sûr de
          vouloir faire ça ?
        </p>

        <q-card-section class="row justify-center">
          <q-btn
            label="Annuler"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="isShowingDialogTaskDelete = false"
          />
          <q-btn
            label="Supprimer"
            flat
            no-caps
            class="q-mb-md items-start"
            color="negative"
            @click="handleDeleteTask"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isShowingDialogTaskMove"
      :position="'standard'"
      full-width
    >
      <q-card>
        <q-card-section class="flex justify-end">
          <q-icon
            name="close"
            size="1.5em"
            color="grey"
            @click="isShowingDialogTaskMove = false"
          />
        </q-card-section>

        <q-item-label
          class="text-bold q-mt-l text-center"
          style="font-size: 1rem"
          >Déplacer la tâche</q-item-label
        >

        <q-select
          outlined
          v-model="select"
          :options="selectOptions"
          option-value="_id"
          option-label="title"
          label="Outlined"
          class="q-ma-md"
        />

        <q-card-section class="row justify-center">
          <q-btn
            label="Annuler"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="isShowingDialogTaskMove = false"
          />
          <q-btn
            label="Déplacer"
            flat
            no-caps
            class="q-mb-md items-start"
            color="negative"
            @click="handleMoveTask"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Task, getTask } from 'src/services/task.services';
import { useDialogStore } from 'src/stores/dialog';
import { useTodosStore } from 'src/stores/todos';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id, taskId } = useRoute().params as { id: string; taskId: string };

const task = ref<Task>({} as Task);

onBeforeMount(async () => {
  task.value = await getTask(taskId);
});

const dialogsStore = useDialogStore();
const { isDialogTaskOptionsOpen } = storeToRefs(dialogsStore);

const todosStore = useTodosStore();
const router = useRouter();

const handleDeleteTask = async () => {
  await todosStore.deleteTask(taskId);
  dialogsStore.handleDialogOptionsOpen('task');
  router.go(-1);
};

const isShowingDialogTaskDelete = ref(false);
const isShowingDialogTaskMove = ref(false);

const { todos } = storeToRefs(todosStore);
const select = ref(todos.value.find((todo) => todo._id === id));
const selectOptions = ref(todos.value);

const handleMoveTask = async () => {
  await todosStore.updateTask(taskId, {
    description: task.value.description,
    done: task.value.done,
    title: task.value.title,
    list: select.value?._id as string,
  });
  dialogsStore.handleDialogOptionsOpen('task');
  router.replace(`/todos/${id}`);
};
</script>
