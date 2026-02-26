import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { featuresService } from './feature.service';
import { Feature } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

export const getAllFeaturesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'features'] => [
  'characters',
  characterId,
  'features',
];

export const useGetAllFeatures = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Feature[],
    Error,
    Feature[],
    ['characters', number, 'features']
  >({
    queryKey: getAllFeaturesKey({ characterId: characterId! }),
    queryFn: () => featuresService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useCreateFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Feature,
    AxiosError<ApiErrorResponse>,
    CreateFeatureParams
  >({
    mutationFn: (params: CreateFeatureParams) => featuresService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Feature,
    AxiosError<ApiErrorResponse>,
    UpdateFeatureParams
  >({
    mutationFn: (params: UpdateFeatureParams) => featuresService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Feature,
    AxiosError<ApiErrorResponse>,
    DeleteFeatureParams
  >({
    mutationFn: (params: DeleteFeatureParams) =>
      featuresService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
