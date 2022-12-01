<template>
  <q-page class="q-pa-md" style="display: flex; align-items: stretch">
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

      <q-btn
        class="q-mt-auto"
        color="accent"
        label="Modifier"
        no-caps
        @click="$router.push(`/todos/${id}/tasks/${taskId}/edit`)"
      />
    </q-item-section>
  </q-page>
</template>

<script setup lang="ts">
import { Task, getTask } from 'src/services/task.services';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const { id, taskId } = useRoute().params as { id: string; taskId: string };

const task = ref<Task>({} as Task);

onBeforeMount(async () => {
  task.value = await getTask(taskId);
});
</script>
