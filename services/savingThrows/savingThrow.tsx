import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { savingThrowService } from '@/services/savingThrows/savingThrow.service';
import type { SavingThrow } from '@/types/character';

export const getAllSavingThrowsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'savingTrows'] => [
  'characters',
  characterId,
  'savingTrows',
];

export const useGetAllSavingThrows = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    SavingThrow[],
    Error,
    SavingThrow[],
    ['characters', number, 'savingTrows']
  >({
    queryKey: getAllSavingThrowsKey({ characterId: characterId! }),
    queryFn: () => savingThrowService.fetchAll({ characterId: characterId! }),
    enabled: !!character,
  });
};

export const useUpdateSavingThrowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SavingThrow,
    AxiosError<ApiErrorResponse>,
    UpdateSavingThrowParams
  >({
    mutationFn: (params: UpdateSavingThrowParams) =>
      savingThrowService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllSavingThrowsKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
