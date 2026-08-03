import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { tableRequestService } from '@/services/tableRequests/tableRequest.service';
import type { SearchUserResult } from '@/services/tableRequests/tableRequest.service';
import type { TableRequest, TableRequestStats } from '@/types/table';

export const tableRequestsKey = ['table_requests'];
export const tableRequestStatsKey = ['table_requests', 'stats'];
export const tableInvitesKey = (tableId: number) => [
  'table_requests',
  'table_invites',
  tableId,
];

export const searchUsersKey = (params: SearchUsersParams | null) => [
  'table_requests',
  'search_users',
  params,
];

export const useGetTableRequests = (params: GetTableRequestsParams = {}) => {
  return useQuery<TableRequest[], AxiosError<ApiErrorResponse>>({
    queryKey: [...tableRequestsKey, params],
    queryFn: () => tableRequestService.fetchAll(params),
  });
};

export const useGetTableRequestStats = () => {
  return useQuery<TableRequestStats, AxiosError<ApiErrorResponse>>({
    queryKey: tableRequestStatsKey,
    queryFn: tableRequestService.fetchStats,
  });
};

export const useGetTableInvites = ({ tableId }: GetTableInvitesParams) => {
  return useQuery<TableRequest[], AxiosError<ApiErrorResponse>>({
    queryKey: tableInvitesKey(tableId),
    queryFn: () => tableRequestService.fetchTableInvites({ tableId }),
    enabled: !!tableId,
  });
};

export const useSearchUsers = (params: SearchUsersParams | null) => {
  return useQuery<SearchUserResult[], AxiosError<ApiErrorResponse>>({
    queryKey: searchUsersKey(params),
    queryFn: () => {
      if (!params?.tableId) return [];
      return tableRequestService.searchUsers(params);
    },
    enabled: !!params && !!params.tableId,
  });
};

const invalidateTableRequestQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
  tableId?: number,
  invalidateTables = false,
) => {
  queryClient.invalidateQueries({ queryKey: tableRequestsKey });
  queryClient.invalidateQueries({ queryKey: tableRequestStatsKey });
  if (tableId) {
    queryClient.invalidateQueries({ queryKey: tableInvitesKey(tableId) });
  }
  if (invalidateTables) {
    queryClient.invalidateQueries({ queryKey: ['tables'] });
    if (tableId) {
      queryClient.invalidateQueries({ queryKey: ['tables', tableId] });
    }
  }
};

export const useInviteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TableRequest,
    AxiosError<ApiErrorResponse>,
    InviteUserParams
  >({
    mutationFn: (params) => tableRequestService.invite(params),
    onSuccess: (_data, { tableId }) => {
      invalidateTableRequestQueries(queryClient, tableId);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useAcceptTableRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    TableRequestActionParams
  >({
    mutationFn: (params) => tableRequestService.accept(params),
    onSuccess: (_data, { tableId }) => {
      invalidateTableRequestQueries(queryClient, tableId, true);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useRefuseTableRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    TableRequestActionParams
  >({
    mutationFn: (params) => tableRequestService.refuse(params),
    onSuccess: (_data, { tableId }) => {
      invalidateTableRequestQueries(queryClient, tableId);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useCancelTableRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    TableRequestActionParams
  >({
    mutationFn: (params) => tableRequestService.cancel(params),
    onSuccess: (_data, { tableId }) => {
      invalidateTableRequestQueries(queryClient, tableId);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
