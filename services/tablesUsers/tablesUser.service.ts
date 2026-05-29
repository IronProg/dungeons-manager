import api from 'core/api/api';

export const tablesUserService = {
  deleteTablesUser: ({ id }: DeleteTablesUserParams) =>
    api.delete<null>(`/tables_users/${id}`).then((res) => res.data),
};
