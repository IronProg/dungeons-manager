import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authService } from './auth.service';
import { useAuthInvalidationAsync } from './auth.invalidate';

import type { User } from 'types/user';

export const authKey = ['auth'];

export const useGetCurrentUser = () =>
  useQuery({
    queryFn: () => authService.validateToken(),
    queryKey: authKey,
  });

export const useSignInMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<User, Error, SignInParams>({
    mutationFn: (params: SignInParams) => authService.signIn(params),
    onSuccess: async (user) => {
      await invalidateQueriesAsync();
      queryClient.setQueryData(authKey, user);
    },
  });
};

export const useSignOutMutation = () => {
  const { invalidateQueriesAsync } = useAuthInvalidationAsync();
  const queryClient = useQueryClient();

  return useMutation<null, Error>({
    mutationFn: () => authService.signOut(),
    onSuccess: async () => {
      await invalidateQueriesAsync();
      queryClient.setQueryData(authKey, null);
    },
  });
};

export const useSignUpMutation = () =>
  useMutation<User, Error, SignUpParams>({
    mutationFn: (data: SignUpParams) => authService.register(data),
  });
