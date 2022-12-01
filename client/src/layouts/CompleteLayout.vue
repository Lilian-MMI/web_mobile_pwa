<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar class="q-pa-sm">
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
  </q-layout>
</template>

<script setup lang="ts">
import { useTodosStore } from 'src/stores/todos';
import { ref } from 'vue';

const isShowingDialogCreateList = ref(false);
const listName = ref('');

const todosStore = useTodosStore();

const handleAddList = () => {
  todosStore.addTodo({ title: listName.value });
  isShowingDialogCreateList.value = false;
};
</script>
