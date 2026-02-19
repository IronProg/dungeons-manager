import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useAuthInvalidationAsync = () => {
  const queryClient = useQueryClient();

  const invalidateQueriesAsync = useCallback(async () => {
    await Promise.all([queryClient.resetQueries({ queryKey: ['characters'] })]);
  }, [queryClient]);

  return { invalidateQueriesAsync };
};
