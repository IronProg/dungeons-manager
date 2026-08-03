import api from '@/core/api/api';
import type { Table, TableRequest } from '@/types/table';
import type { TableCharacter } from '@/types/table_character';

export const tableService = {
  fetchAll: () => api.get<Table[]>('/tables').then((res) => res.data),
  fetchCharactersResume: ({ id }: GetTableParams) =>
    api
      .get<TableCharacter[]>(`/tables/${id}/characters_resume`)
      .then((res) => res.data),
  fetch: ({ id }: GetTableParams) =>
    api.get<Table>(`/tables/${id}`).then((res) => res.data),
  create: ({ ...params }: CreateTableParams) =>
    api.post<Table>(`/tables`, params).then((res) => res.data),
  update: ({ ...params }: UpdateTableParams) =>
    api.put<Table>(`/tables/${params.id}`, params).then((res) => res.data),
  destroy: ({ ...params }: DestroyTableParams) =>
    api.delete<null>(`/tables/${params.id}`).then((res) => res.data),
  join: ({ ...params }: JoinTableParams) =>
    api.post<TableRequest>('/tables/join', params).then((res) => res.data),
  leave: ({ id }: GetTableParams) =>
    api.post<null>(`/tables/${id}/leave`).then((res) => res.data),
};
