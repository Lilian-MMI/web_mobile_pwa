<template>
  <q-page class="column q-pa-md">
    <q-item-section>
      <q-item-label class="text-weight-bold" style="font-size: 1.3em">
        Tâches - {{ tasksNotDone.length }}
      </q-item-label>

      <q-banner
        dense
        class="text-white bg-grey-2 q-mt-md rounded-borders"
        v-for="task in tasksNotDone"
        :key="task._id"
      >
        <div class="row">
          <q-checkbox
            v-model="task.done"
            :label="task.title"
            style="color: grey"
            @click="
              updateTask(task._id, {
                title: task.title,
                done: task.done,
                description: task.description,
                list: todo._id,
              })
            "
          />
          <q-icon
            name="chevron_right"
            size="2em"
            color="grey"
            style="margin: auto 0 auto auto"
            @click="$router.push(`/todos/${todo._id}/tasks/${task._id}`)"
          />
        </div>
      </q-banner>
    </q-item-section>

    <q-item-section style="margin-left: 0 !important">
      <q-item-label class="text-weight-bold" style="font-size: 1.3em">
        Tâches complétées - {{ tasksDone.length }}
      </q-item-label>

      <q-banner
        dense
        class="text-white bg-grey-2 q-mt-md rounded-borders"
        v-for="task in tasksDone"
        :key="task._id"
      >
        <q-checkbox
          color="positive"
          v-model="task.done"
          :label="task.title"
          style="color: green; text-decoration: line-through"
          @click="
            updateTask(task._id, {
              title: task.title,
              done: task.done,
              description: task.description,
              list: todo._id,
            })
          "
        />
      </q-banner>
    </q-item-section>

    <div
      style="
        position: absolute;
        bottom: 1rem;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
    >
      <q-btn
        flat
        round
        icon="add_circle"
        color="accent"
        :active-class="`text-primary`"
        style="font-size: 2rem"
        @click="$router.push(`/todos/${todo._id}/tasks/new`)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Todo } from 'src/services/list.services';
import { Task, updateTask } from 'src/services/task.services';
import { useTodosStore } from 'src/stores/todos';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const { id } = useRoute().params as { id: string };

const todosStore = useTodosStore();
const todo = ref(
  storeToRefs(todosStore).todos.value.find(
    (todo) => todo._id === id
  ) as Todo & { tasks?: Task[] }
);

const tasksDone = computed(() => {
  return todo.value.tasks?.filter((task) => task.done) || [];
});

const tasksNotDone = computed(() => {
  return todo.value.tasks?.filter((task) => !task.done) || [];
});
</script>
