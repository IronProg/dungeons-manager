import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resourcesService } from './resource.service';
import { Resource } from 'types/character';

export const getAllResourcesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'resources'] => [
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
    queryKey: getAllResourcesKey({ characterId: characterId! }),
    queryFn: () => resourcesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};

export const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Resource, Error, CreateResourceParams>({
    mutationFn: (params: CreateResourceParams) =>
      resourcesService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
  });
};

export const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Resource, Error, UpdateResourceParams>({
    mutationFn: (params: UpdateResourceParams) =>
      resourcesService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
  });
};

export const useDeleteResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Resource, Error, DeleteResourceParams>({
    mutationFn: (params: DeleteResourceParams) =>
      resourcesService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
  });
};
