import { api } from 'src/boot/axios';

export type Todo = {
  _id: string;
  title: string;
  favorite: boolean;
};
export type TodoCreate = Omit<Todo, '_id' | 'favorite'>;
export type TodoUpdate = Partial<TodoCreate>;

export const getLists = async (): Promise<Todo[]> => {
  const { data } = await api.get('/lists');
  return data;
};

export const getList = async (id: string): Promise<Todo> => {
  const { data } = await api.get(`/lists/${id}`);
  return data;
};

export const createList = async (list: TodoCreate): Promise<Todo> => {
  const { data } = await api.post('/lists', list);
  return data;
};

export const updateList = async (
  id: string,
  list: TodoUpdate
): Promise<Todo> => {
  const { data } = await api.put(`/lists/${id}`, list);
  return data;
};

export const deleteList = async (id: string) => {
  const { data } = await api.delete(`/lists/${id}`);
  return data;
};
