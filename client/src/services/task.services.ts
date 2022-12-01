import { Todo } from './list.services';
import { api } from 'src/boot/axios';

export type Task = {
  _id: string;
  title: string;
  description: string;
  list: Todo['_id'];
  done: boolean;
};
export type TaskCreate = Omit<Task, '_id'>;
export type TaskUpdate = Partial<TaskCreate>;

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks');
  return data;
};

export const getTask = async (id: string): Promise<Task> => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (
  task: Omit<TaskCreate, 'done'>
): Promise<Task> => {
  const { data } = await api.post('/tasks', task);
  return data;
};

export const updateTask = async (
  id: string,
  task: TaskUpdate
): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
