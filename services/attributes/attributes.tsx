import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attributesService } from './attributes.service';
import { Attribute } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

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
