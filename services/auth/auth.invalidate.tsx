import { useQueryClient } from '@tanstack/react-query';

export const useAuthInvalidationAsync = () => {
  const queryClient = useQueryClient();

  const invalidateQueriesAsync = async () => {
    await Promise.all([queryClient.resetQueries({ queryKey: ['characters'] })]);
  };

  return { invalidateQueriesAsync };
};
