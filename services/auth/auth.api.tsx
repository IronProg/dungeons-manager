import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { useCharacterStore } from '@/core/stores/characterStore';
import { useTableFilterStore } from '@/core/stores/tableFilterStore';
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
      useCharacterStore.getState().setSelectedCharacterId(undefined);
      useTableFilterStore.getState().clearTableId();
      await queryClient.resetQueries();
      await queryClient.setQueryData(authKey, null);
    },
    onError: async ({ response }) => {
      handleErrorMessage(response?.data);

      await removeAccessToken();
      await removeRefreshToken();
      useCharacterStore.getState().setSelectedCharacterId(undefined);
      useTableFilterStore.getState().clearTableId();
      await queryClient.resetQueries();
      await queryClient.setQueryData(authKey, null);
    },
  });
};

export const useSendInstructionsMutation = () => {
  return useMutation<
    void,
    AxiosError<ApiErrorResponse>,
    SendInstructionsParams
  >({
    mutationFn: (params: SendInstructionsParams) =>
      authService.sendInstructions(params),
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, ChangePasswordParams>({
    mutationFn: (params: ChangePasswordParams) =>
      authService.changePassword(params),
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
