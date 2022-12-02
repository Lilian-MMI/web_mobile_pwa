<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-weight-medium">
          Dashboard
        </q-toolbar-title>
        <q-avatar size="40px" class="overlapping">
          <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-black">
      <q-toolbar class="q-pa-sm justify-between">
        <q-btn
          flat
          round
          icon="subject"
          class="text-grey-8"
          :active-class="`text-primary`"
          @click="iShowingSidebar = true"
        />
        <q-btn
          flat
          round
          icon="add_circle"
          color="accent"
          @click="isShowingDialogCreateList = true"
          :active-class="`text-primary`"
          style="font-size: 1.2rem"
        />
        <q-btn
          flat
          round
          icon="person"
          class="text-grey-8"
          :active-class="`text-primary`"
        />
      </q-toolbar>
    </q-footer>

    <q-dialog
      v-model="isShowingDialogCreateList"
      :position="'standard'"
      full-width
    >
      <q-card>
        <q-card-section class="flex justify-end">
          <q-icon
            name="close"
            size="1.5em"
            color="grey"
            @click="isShowingDialogCreateList = false"
          />
        </q-card-section>

        <q-item-label
          class="text-bold q-mt-l text-center"
          style="font-size: 1rem"
          >Créer une nouvelle liste</q-item-label
        >

        <p class="text-start q-ma-md">Nom de la liste</p>
        <q-input
          v-model="listName"
          class="q-ma-md"
          outlined
          dense
          placeholder="Nom de la liste"
        />

        <q-card-section class="row justify-center">
          <q-btn
            label="Annuler"
            flat
            no-caps
            class="q-mb-md items-start"
            @click="isShowingDialogCreateList = false"
          />
          <q-btn
            label="Créer"
            color="accent"
            no-caps
            class="q-mb-md items-start"
            @click="handleAddList"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-drawer
      side="left"
      v-model="iShowingSidebar"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-item-section class="flex justify-end">
            <q-icon
              class="q-ml-auto"
              name="close"
              size="1.5em"
              color="grey"
              @click="iShowingSidebar = false"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-weight-bold q-mt-md"
              style="font-size: 1.3rem"
            >
              Mes listes
            </q-item-label>
            <q-btn
              label="Créer une liste"
              color="accent"
              no-caps
              class="q-my-md"
              @click="isShowingDialogCreateList = true"
              :active-class="`text-primary`"
            />
          </q-item-section>
          <q-item-section>
            <q-item
              class="q-pa-none text-weight-medium"
              v-for="(todo, i) in todos"
              :key="todo._id"
              clickable
              @click="$router.push(`/todos/${todo._id}`)"
            >
              <q-item-section>
                <q-item-label>{{ todo.title }}</q-item-label>
                <q-separator v-if="i < todos.length - 1" class="q-mt-md" />
              </q-item-section>
            </q-item>
          </q-item-section>
        </div>
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from 'src/stores/todos';
import { ref } from 'vue';

const isShowingDialogCreateList = ref(false);
const listName = ref('');

const todosStore = useTodosStore();
const { todos } = storeToRefs(todosStore);

const handleAddList = () => {
  todosStore.addTodo({ title: listName.value });
  isShowingDialogCreateList.value = false;
};

const iShowingSidebar = ref(false);
</script>
