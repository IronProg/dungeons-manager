import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { savingThrowService } from './savingThrow.service';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';

import { SavingThrow } from 'types/character';

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
    staleTime: 10 * 60_000,
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
