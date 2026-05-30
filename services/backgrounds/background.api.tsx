import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { backgroundService } from '@/services/backgrounds/background.service';
import type { Background } from '@/types/character';

export const getBackgroundKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'background'] => [
  'characters',
  characterId,
  'background',
];

export const useGetBackground = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Background,
    Error,
    Background,
    ['characters', number, 'background']
  >({
    queryKey: getBackgroundKey({ characterId: characterId! }),
    queryFn: () => backgroundService.fetch({ characterId: characterId! }),
    enabled: !!character,
  });
};

export const useUpdateBackgroundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Background,
    AxiosError<ApiErrorResponse>,
    UpdateBackgroundParams
  >({
    mutationFn: (params: UpdateBackgroundParams) =>
      backgroundService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getBackgroundKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
