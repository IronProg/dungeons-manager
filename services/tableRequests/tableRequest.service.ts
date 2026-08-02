import api from '@/core/api/api';
import type { TableRequest, TableRequestStats } from '@/types/table';

export type SearchUserResult = {
  id: number;
  nickname: string;
  discriminator: string;
};

export const tableRequestService = {
  fetchAll: ({ status, kind }: GetTableRequestsParams = {}) =>
    api
      .get<TableRequest[]>('/table_requests', { params: { status, kind } })
      .then((res) => res.data),

  fetchStats: () =>
    api.get<TableRequestStats>('/table_requests/stats').then((res) => res.data),

  fetchTableInvites: ({ tableId }: GetTableInvitesParams) =>
    api
      .get<TableRequest[]>('/table_requests/table_invites', {
        params: { table_id: tableId },
      })
      .then((res) => res.data),

  searchUsers: ({
    tableId,
    nickname,
    discriminator,
    email,
  }: SearchUsersParams) =>
    api
      .get<SearchUserResult[]>('/table_requests/search_users', {
        params: { table_id: tableId, nickname, discriminator, email },
      })
      .then((res) => res.data),

  invite: ({ tableId, receiverId }: InviteUserParams) =>
    api
      .post<TableRequest>('/table_requests/invite', {
        table_id: tableId,
        receiver_id: receiverId,
      })
      .then((res) => res.data),

  accept: ({ id }: TableRequestActionParams) =>
    api.post<null>(`/table_requests/${id}/accept`).then((res) => res.data),

  refuse: ({ id }: TableRequestActionParams) =>
    api.post<null>(`/table_requests/${id}/refuse`).then((res) => res.data),

  cancel: ({ id }: TableRequestActionParams) =>
    api.post<null>(`/table_requests/${id}/cancel`).then((res) => res.data),
};
