import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authService } from './auth.service';
import { useAuthInvalidationAsync } from './auth.invalidate';

import type { TokenResponse } from 'types/user';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'core/utils/tokens';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

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
        console.log({ response });
        handleErrorMessage(response?.data);
      },
    },
  );
};

export const useSignOutMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ApiErrorResponse>>({
    mutationFn: () => authService.signOut(),
    onSuccess: async () => {
      await removeAccessToken();
      await removeRefreshToken();
      await invalidateQueriesAsync();
      queryClient.setQueryData(authKey, null);
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
