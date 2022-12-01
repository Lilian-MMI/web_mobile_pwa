<template>
  <q-header class="bg-white text-black">
    <q-toolbar class="q-pa-sm">
      <!-- go back -->
      <q-btn
        icon="chevron_left"
        color="grey-3"
        unelevated
        @click="$router.go(-1)"
        class="text-black"
      />

      <!-- title -->
      <q-toolbar-title class="text-weight-medium" v-if="props.title">
        {{ props.title }}
      </q-toolbar-title>

      <!-- cancel -->
      <q-btn
        v-if="props.button"
        flat
        round
        :icon="!props.button ? '' : 'more_horiz'"
        :label="!props.button ? 'Annuler' : ''"
        no-caps
        color="grey-8"
        to="/"
        class="text-black q-ml-auto"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  button?: 'cancel' | 'edit';
}>();
</script>
