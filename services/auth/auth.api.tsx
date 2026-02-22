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

export const authKey = ['auth'];

export const useGetCurrentUser = () =>
  useQuery({
    queryFn: () => authService.validateToken(),
    queryKey: authKey,
  });

export const useSignInMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<TokenResponse, Error, SignInParams>({
    mutationFn: (params: SignInParams) => authService.signIn(params),
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      await invalidateQueriesAsync();
      queryClient.invalidateQueries({ queryKey: authKey });
    },
  });
};

export const useSignOutMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<null, Error>({
    mutationFn: () => authService.signOut(),
    onSuccess: async () => {
      await removeAccessToken();
      await removeRefreshToken();
      await invalidateQueriesAsync();
      queryClient.invalidateQueries({ queryKey: authKey });
    },
  });
};

export const useSignUpMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<TokenResponse, Error, SignUpParams>({
    mutationFn: (data: SignUpParams) => authService.register(data),
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      await invalidateQueriesAsync();
      queryClient.invalidateQueries({ queryKey: authKey });
    },
  });
};
