import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { setPersistedCharacterId } from '@/core/storage/mmkv';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/core/utils/tokens';
import { useAuthInvalidationAsync } from '@/services/auth/auth.invalidate';
import { authService } from '@/services/auth/auth.service';
import type { TokenResponse } from '@/types/user';

export const authKey = ['auth'];

export const useGetCurrentUser = () =>
  useQuery({
    queryFn: () => authService.validateToken(),
    queryKey: authKey,
  });

export const useSignInMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<TokenResponse, AxiosError<ApiErrorResponse>, SignInParams>(
    {
      mutationFn: (params: SignInParams) => authService.signIn(params),
      onSuccess: async ({ accessToken, refreshToken }) => {
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
        await invalidateQueriesAsync();
        queryClient.invalidateQueries({ queryKey: authKey });
      },
      onError: ({ response }) => {
        handleErrorMessage(response?.data);
      },
    },
  );
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ApiErrorResponse>>({
    mutationFn: () => authService.signOut(),
    onSuccess: async () => {
      await removeAccessToken();
      await removeRefreshToken();
      setPersistedCharacterId(undefined);
      await queryClient.resetQueries();
      await queryClient.setQueryData(authKey, null);
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useSignUpMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<TokenResponse, AxiosError<ApiErrorResponse>, SignUpParams>(
    {
      mutationFn: (data: SignUpParams) => authService.register(data),
      onSuccess: async ({ accessToken, refreshToken }) => {
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
        await invalidateQueriesAsync();
        queryClient.invalidateQueries({ queryKey: authKey });
      },
      onError: ({ response }) => {
        handleErrorMessage(response?.data);
      },
    },
  );
};
