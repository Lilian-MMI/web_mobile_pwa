import { defineStore } from 'pinia';
import {
  createList,
  deleteList,
  getLists,
  Todo,
  TodoCreate,
  TodoUpdate,
  updateList,
} from 'src/services/list.services';
import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  TaskCreate,
  TaskUpdate,
  updateTask,
} from 'src/services/task.services';

export const useTodosStore = defineStore({
  id: 'todosStore',

  state: () => ({
    todos: [] as (Todo & { tasks?: Task[] })[],
    error: null,
  }),

  actions: {
    // ITS TODO
    async fetchTodos() {
      this.todos = await getLists();
      const tasks = await getTasks();

      this.todos.forEach((todo) => {
        todo.tasks = tasks.filter((task) => task.list === todo._id);
      });
    },

    async addTodo(todo: TodoCreate) {
      const newTodo = await createList({ ...todo });
      this.todos.push(newTodo);
    },

    async deleteTodo(id: string) {
      await deleteList(id);
      this.todos = this.todos.filter((todo) => todo._id !== id);
    },

    async updateTodo(id: string, todoUpdate: TodoUpdate) {
      const todoReturn = await updateList(id, todoUpdate);

      this.todos = this.todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, ...todoReturn };
        }
        return todo;
      });
    },

    // ITS TASK
    async addTask(task: Omit<TaskCreate, 'done'>) {
      const newTask = await createTask(task);
      this.todos = this.todos.map((todo) => {
        if (todo._id === newTask.list) {
          todo.tasks?.push(newTask);
        }
        return todo;
      });
    },

    async deleteTask(id: string, todoId: string) {
      await deleteTask(id);
      this.todos = this.todos.map((todo) => {
        if (todo._id === todoId) {
          todo.tasks = todo.tasks?.filter((task) => task._id !== id);
        }
        return todo;
      });
    },

    async updateTask(id: string, taskUpdate: TaskUpdate) {
      const taskReturn = await updateTask(id, taskUpdate);
      this.todos = this.todos.map((todo) => {
        if (todo._id === taskReturn.list) {
          todo.tasks = todo.tasks?.map((task) => {
            if (task._id === id) {
              return { ...task, ...taskReturn };
            }
            return task;
          });
        }
        return todo;
      });
    },
  },
});
