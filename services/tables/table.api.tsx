import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { tableService } from './table.service';

import type { Table } from 'types/table';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';
import { TableCharacter } from 'types/table_character';

export const useGetAllTables = () => {
  return useQuery({
    queryKey: ['tables'],
    queryFn: tableService.fetchAll,
    staleTime: 10 * 60_000,
  });
};

export const useGetTable = ({ id }: GetTableParams) => {
  return useQuery<Table, Error, Table, ['tables', number]>({
    queryKey: ['tables', id!],
    queryFn: () => tableService.fetch({ id }),
    staleTime: 10 * 60_000,
    enabled: !!id,
  });
};

export const useGetTableCharactersResume = ({ id }: GetTableParams) => {
  return useQuery<
    TableCharacter[],
    Error,
    TableCharacter[],
    ['tables', number, 'characters']
  >({
    queryKey: ['tables', id!, 'characters'],
    queryFn: () => tableService.fetchCharactersResume({ id }),
    staleTime: 10 * 60_000,
    enabled: !!id,
  });
};

export const useCreateTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Table, AxiosError<ApiErrorResponse>, CreateTableParams>({
    mutationFn: (params: CreateTableParams) => tableService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Table, AxiosError<ApiErrorResponse>, UpdateTableParams>({
    mutationFn: (params: UpdateTableParams) => tableService.update(params),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['tables', id] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDestroyTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ApiErrorResponse>, DestroyTableParams>({
    mutationFn: (params) => tableService.destroy(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useJoinTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ApiErrorResponse>, JoinTableParams>({
    mutationFn: (params) => tableService.join(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useLeaveTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ApiErrorResponse>, GetTableParams>({
    mutationFn: (params) => tableService.leave(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
