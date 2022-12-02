import { defineStore } from 'pinia';

export const useDialogStore = defineStore({
  id: 'dialogStore',

  state: () => ({
    isDialogTaskOptionsOpen: false,
    isDialogListOptionsOpen: false,
  }),

  getters: {},

  actions: {
    handleDialogOptionsOpen(type: 'task' | 'list') {
      if (type === 'task') {
        this.isDialogTaskOptionsOpen = !this.isDialogTaskOptionsOpen;
      } else {
        this.isDialogListOptionsOpen = !this.isDialogListOptionsOpen;
      }
    },
  },
});
