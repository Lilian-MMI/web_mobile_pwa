<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <h4 class="row">
      Bonjour, <br />
      <span class="text-bold"
        >{{ currentUser?.firstname }} {{ currentUser?.lastname }} ! 👋</span
      >
    </h4>

    <div class="full-width">
      <q-card class="my-card q-my-md" v-for="todo in todos" :key="todo._id">
        <q-item class="bg-grey-4">
          <q-item-section>
            <q-item-label class="text-bold">{{ todo.title }}</q-item-label>
          </q-item-section>
          <q-icon
            name="more_horiz"
            size="2em"
            color="grey"
            @click="handleEditList(todo._id)"
          />
        </q-item>

        <q-separator />

        <q-card-section>
          <div v-if="todo.tasks?.length" class="full-width">
            <q-item
              v-for="task in todo.tasks"
              :key="task._id"
              class="q-mb-sm q-pa-none full-width"
            >
              <q-item-section>
                <q-checkbox
                  v-model="task.done"
                  :label="task.title"
                  @click="
                    todosStore.updateTask(task._id, {
                      title: task.title,
                      done: task.done,
                      description: task.description,
                      list: todo._id,
                    })
                  "
                />
              </q-item-section>
            </q-item>
          </div>
          <div v-else>
            <q-item>
              <q-item-section>
                <q-item-label
                  >Cette liste ne contient aucune tâches ajoutez en une depuis
                  la liste
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-center">
          <q-btn
            label="Voir la liste compléte"
            flat
            no-caps
            @click="$router.push(`/todos/${todo._id}`)"
          />
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="isShowingDialogListOptions" :position="'bottom'">
      <q-card>
        <q-card-section class="flex justify-between">
          <q-item-label class="text-bold q-mt-xs" style="font-size: 1rem"
            >Liste options</q-item-label
          >
          <q-icon
            name="close"
            size="2em"
            color="grey"
            @click="isShowingDialogListOptions = false"
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="column">
          <q-btn
            label="Modifier la liste"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="$router.push(`/todos/${listSelected}`)"
          />
          <q-btn
            label="Supprimer la liste"
            flat
            no-caps
            class="q-mb-md items-start"
            color="negative"
            @click="isShowingDialogListDelete = true"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isShowingDialogListDelete"
      :position="'standard'"
      full-width
    >
      <q-card>
        <q-card-section class="flex justify-end">
          <q-icon
            name="close"
            size="1.5em"
            color="grey"
            @click="isShowingDialogListOptions = false"
          />
        </q-card-section>

        <q-item-label
          class="text-bold q-mt-l text-center"
          style="font-size: 1rem"
          >Supprimer la liste</q-item-label
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
            @click="isShowingDialogListDelete = false"
          />
          <q-btn
            label="Supprimer"
            flat
            no-caps
            class="q-mb-md items-start"
            color="negative"
            @click="handleDeleteList"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from 'src/stores/todos';
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
const todosStore = useTodosStore();

const isShowingDialogListOptions = ref(false);
const isShowingDialogListDelete = ref(false);
const listSelected = ref<string | null>(null);

const handleEditList = async (id: string) => {
  isShowingDialogListOptions.value = true;
  listSelected.value = id;
};

const handleDeleteList = async () => {
  isShowingDialogListDelete.value = false;
  await todosStore.deleteTodo(listSelected.value as string);
  isShowingDialogListOptions.value = false;
  listSelected.value = null;
};

const todos = storeToRefs(todosStore).todos;
</script>
