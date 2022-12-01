<template>
  <router-view :key="$route.fullPath" />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useTodosStore } from './stores/todos';

const todosStore = useTodosStore();

onBeforeMount(async () => {
  await todosStore.fetchTodos();
});
</script>
