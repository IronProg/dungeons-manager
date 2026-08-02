import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { generalInfoService } from '@/services/generalInfos/generalInfos.service';
import type { CharacterGeneralInfo } from '@/types/character';

export const getCharacterGeneralInfoKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'generalInfo'] => [
  'characters',
  characterId,
  'generalInfo',
];

export const useGetCharacterGeneralInfo = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    CharacterGeneralInfo,
    Error,
    CharacterGeneralInfo,
    ['characters', number, 'generalInfo']
  >({
    queryKey: getCharacterGeneralInfoKey({ characterId: characterId! }),
    queryFn: () => generalInfoService.fetch({ characterId: characterId! }),
    enabled: !!character,
    networkMode: 'offlineFirst',
  });
};

export const useUpdateGeneralInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CharacterGeneralInfo,
    AxiosError<ApiErrorResponse>,
    UpdateGeneralInfoParams
  >({
    mutationFn: (params: UpdateGeneralInfoParams) =>
      generalInfoService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getCharacterGeneralInfoKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
