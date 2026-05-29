import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { proficiencyService } from '@/services/proficiencies/proficiency.service';
import type { Proficiency } from '@/types/character';

export const getProficiencyKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'proficiency'] => [
  'characters',
  characterId,
  'proficiency',
];

export const useGetProficiency = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Proficiency,
    Error,
    Proficiency,
    ['characters', number, 'proficiency']
  >({
    queryKey: getProficiencyKey({ characterId: characterId! }),
    queryFn: () => proficiencyService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateProficiencyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Proficiency,
    AxiosError<ApiErrorResponse>,
    UpdateProficiencyParams
  >({
    mutationFn: (params: UpdateProficiencyParams) =>
      proficiencyService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getProficiencyKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
