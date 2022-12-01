<template>
  <q-page class="q-pa-md" style="display: flex; align-items: stretch">
    <q-item-section>
      <div>
        <q-item-label class="text-weight-bold" style="font-size: 1.3rem">
          Créer une tâche
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
        label="Créer"
        no-caps
        @click="handleCreateTask"
      />
    </q-item-section>
  </q-page>
</template>

<script setup lang="ts">
import { Task } from 'src/services/task.services';
import { useTodosStore } from 'src/stores/todos';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params as { id: string };
const task = ref<Task>({} as Task);

const todosStore = useTodosStore();
const router = useRouter();

const handleCreateTask = () => {
  todosStore.addTask({
    title: task.value.title,
    description: task.value.description,
    list: id,
  });
  router.go(-1);
};
</script>
