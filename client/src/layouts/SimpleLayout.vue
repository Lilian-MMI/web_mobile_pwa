<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader :button="button" :buttonAction="buttonAction" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from 'src/components/AppHeader.vue';
import { useRoute } from 'vue-router';

const button = useRoute().meta.buttonType as 'cancel' | 'edit' | undefined;
const buttonAction = useRoute().meta.buttonAction as
  | 'task'
  | 'list'
  | undefined;
</script>
