import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attributesService } from './attributes.service';
import { Attribute } from 'types/character';

export const getAllAttributesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'attributes'] => [
  'characters',
  characterId,
  'attributes',
];

export const useGetAllAttributes = ({
  characterId,
}: GetAllAttributesParams) => {
  return useQuery<
    Attribute[],
    Error,
    Attribute[],
    ['characters', number, 'attributes']
  >({
    queryKey: getAllAttributesKey({ characterId: characterId! }),
    queryFn: () => attributesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};

export const useUpdateAllAttributesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attribute[], Error, UpdateAllAttributesParams>({
    mutationFn: (params: UpdateAllAttributesParams) =>
      attributesService.updateAll(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId],
      });
    },
  });
};
