import { useQuery } from '@tanstack/react-query';
import { resourcesService } from './resource.service';
import { Resource } from 'types/character';

export const getAllResourcesKey = ({
  characterId,
}: GetAllResourcesParams): ['characters', number, 'resources'] => [
  'characters',
  characterId,
  'resources',
];

export const useGetAllResources = ({ characterId }: GetAllResourcesParams) => {
  return useQuery<
    Resource[],
    Error,
    Resource[],
    ['characters', number, 'resources']
  >({
    queryKey: getAllResourcesKey({ characterId }),
    queryFn: () => resourcesService.fetchAll({ characterId }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};
