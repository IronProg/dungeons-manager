import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { attributesService } from '@/services/attributes/attributes.service';
import type { Attribute } from '@/types/character';

export const getAllAttributesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'attributes'] => [
  'characters',
  characterId,
  'attributes',
];

export const useGetAllAttributes = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Attribute[],
    Error,
    Attribute[],
    ['characters', number, 'attributes']
  >({
    queryKey: getAllAttributesKey({ characterId: characterId! }),
    queryFn: () => attributesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateAllAttributesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Attribute[],
    AxiosError<ApiErrorResponse>,
    UpdateAllAttributesParams
  >({
    mutationFn: (params: UpdateAllAttributesParams) =>
      attributesService.updateAll(params),
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
