import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/CompleteLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/todos/:id',
    component: () => import('src/layouts/SimpleLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/TodoPage.vue'),
        meta: {
          buttonType: 'edit',
        },
      },
      {
        path: 'tasks/:taskId',
        component: () => import('src/pages/TaskPage.vue'),
        meta: {
          buttonType: 'edit',
        },
      },
      {
        path: 'tasks/new',
        name: 'newTask',
        component: () => import('src/pages/TaskCreatePage.vue'),
        meta: {
          buttonType: 'cancel',
        },
      },
      {
        path: 'tasks/:taskId/edit',
        name: 'editTask',
        component: () => import('src/pages/TaskEditPage.vue'),
        meta: {
          buttonType: 'cancel',
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
