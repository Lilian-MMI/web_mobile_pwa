<template>
  <q-page class="q-pa-md" style="display: flex; align-items: stretch">
    <q-item-section>
      <div>
        <q-item-label class="text-weight-bold" style="font-size: 1.3rem">
          Modifier une tâche
        </q-item-label>
      </div>

      <div class="q-my-xl">
        <q-item-label class="text-weight-medium">Tâche</q-item-label>
        <q-input
          v-model="task.title"
          dense
          outlined
          class="q-mt-sm"
          placeholder="Nom de la tâche"
        />
      </div>

      <div>
        <q-item-label class="text-weight-medium">Description</q-item-label>
        <q-input
          v-model="task.description"
          dense
          type="textarea"
          outlined
          class="q-mt-sm"
          placeholder="Description de la tâche"
        />
      </div>

      <q-btn
        class="q-mt-auto"
        color="accent"
        label="Modifier"
        no-caps
        @click="handleEditTask"
      />
    </q-item-section>
  </q-page>
</template>

<script setup lang="ts">
import { getTask, Task } from 'src/services/task.services';
import { useTodosStore } from 'src/stores/todos';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id, taskId } = useRoute().params as { id: string; taskId: string };
const todosStore = useTodosStore();

const task = ref<Task>({} as Task);

onBeforeMount(async () => {
  task.value = await getTask(taskId);
});

const router = useRouter();

const handleEditTask = async () => {
  await todosStore.updateTask(taskId, {
    title: task.value.title,
    description: task.value.description,
    done: task.value.done,
    list: id,
  });
  router.go(-1);
};
</script>
