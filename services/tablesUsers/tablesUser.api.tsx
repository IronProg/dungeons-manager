import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { tablesUserService } from '@/services/tablesUsers/tablesUser.service';

export const useDeleteTablesUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    DeleteTablesUserParams
  >({
    mutationFn: (params) => tablesUserService.deleteTablesUser(params),
    onSuccess: (_data, { tableId }) => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      if (tableId) {
        queryClient.invalidateQueries({ queryKey: ['tables', tableId] });
      }
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
