import { useQuery } from '@tanstack/react-query';
import { attributesService } from './attributes.service';
import { Attribute } from 'types/character';

export const getAllAttributesKey = ({
  characterId,
}: GetAllAttributesParams): ['characters', number, 'attributes'] => [
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
    queryKey: getAllAttributesKey({ characterId }),
    queryFn: () => attributesService.fetchAll({ characterId }),
    // staleTime: 10 * 60_000,
  });
};
