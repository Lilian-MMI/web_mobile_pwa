import { defineStore } from 'pinia';

export type User = {
  firstname: string;
  lastname: string;
  birthdate: string;
  _id: string;
};

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    // TEMPO: NO AUTHENTICATION YET
    currentUser: {
      firstname: 'Lilian',
      lastname: 'Ouvrard',
      birthdate: '2022-12-01T13:29:34.000Z',
      _id: '6388ac44d3f0e1cce7f0836f',
    } as User | null,
    loading: false,
    error: null,
  }),

  getters: {
    isLogin(): boolean {
      return !!this.currentUser ?? false;
    },
  },

  actions: {},
});
