import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { classService } from '@/services/classes/class.service';
import type { CharacterClass } from '@/types/character';

export const getAllClassesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'characterClasses'] => [
  'characters',
  characterId,
  'characterClasses',
];

export const useGetAllClasses = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    CharacterClass[],
    Error,
    CharacterClass[],
    ['characters', number, 'characterClasses']
  >({
    queryKey: getAllClassesKey({ characterId: characterId! }),
    queryFn: () => classService.fetchAll({ characterId: characterId! }),
    enabled: !!character,
  });
};

export const useUpdateAllClassesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CharacterClass[],
    AxiosError<ApiErrorResponse>,
    UpdateAllClassesParams
  >({
    mutationFn: (params: UpdateAllClassesParams) =>
      classService.updateAll(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId],
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
