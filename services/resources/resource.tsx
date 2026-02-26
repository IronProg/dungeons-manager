import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resourcesService } from './resource.service';
import { Resource } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

export const getAllResourcesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'resources'] => [
  'characters',
  characterId,
  'resources',
];

export const useGetAllResources = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Resource[],
    Error,
    Resource[],
    ['characters', number, 'resources']
  >({
    queryKey: getAllResourcesKey({ characterId: characterId! }),
    queryFn: () => resourcesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Resource,
    AxiosError<ApiErrorResponse>,
    CreateResourceParams
  >({
    mutationFn: (params: CreateResourceParams) =>
      resourcesService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Resource,
    AxiosError<ApiErrorResponse>,
    UpdateResourceParams
  >({
    mutationFn: (params: UpdateResourceParams) =>
      resourcesService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Resource,
    AxiosError<ApiErrorResponse>,
    DeleteResourceParams
  >({
    mutationFn: (params: DeleteResourceParams) =>
      resourcesService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllResourcesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
