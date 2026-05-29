import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { tablesUserService } from './tablesUser.service';

import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';

export const useDeleteTablesUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    DeleteTablesUserParams
  >({
    mutationFn: (params) => tablesUserService.deleteTablesUser(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tables'] }),
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
