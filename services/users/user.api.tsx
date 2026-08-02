import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { authKey } from '@/services/auth/auth.api';
import { userService } from '@/services/users/user.service';
import type { User } from '@/types/user';

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ApiErrorResponse>, UpdateUserParams>({
    mutationFn: (params) => userService.update(params),
    onSuccess: (data) => {
      queryClient.setQueryData<User>(authKey, data);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
