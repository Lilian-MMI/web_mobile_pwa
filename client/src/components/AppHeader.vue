<template>
  <q-header class="bg-white text-black">
    <q-toolbar class="q-pa-sm">
      <q-btn
        icon="chevron_left"
        color="grey-3"
        unelevated
        @click="$router.go(-1)"
        class="text-black"
      />

      <q-toolbar-title class="text-weight-medium" v-if="props.title">
        {{ props.title }}
      </q-toolbar-title>

      <q-btn
        v-if="props.button"
        flat
        round
        :icon="props.button === 'cancel' ? '' : 'more_horiz'"
        :label="props.button === 'cancel' ? 'Annuler' : ''"
        no-caps
        color="grey-8"
        class="text-black q-ml-auto"
        @click="
          !props.buttonAction
            ? $router.go(-1)
            : dialogsStore.handleDialogOptionsOpen(props.buttonAction)
        "
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog';

const props = defineProps<{
  title?: string;
  button?: 'cancel' | 'edit';
  buttonAction?: 'task' | 'list';
}>();

const dialogsStore = useDialogStore();
</script>
