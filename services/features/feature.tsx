import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { featuresService } from './feature.service';
import { Feature } from 'types/character';

export const getAllFeaturesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'features'] => [
  'characters',
  characterId,
  'features',
];

export const useGetAllFeatures = ({ characterId }: GetAllFeaturesParams) => {
  return useQuery<
    Feature[],
    Error,
    Feature[],
    ['characters', number, 'features']
  >({
    queryKey: getAllFeaturesKey({ characterId: characterId! }),
    queryFn: () => featuresService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};

export const useCreateFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Feature, Error, CreateFeatureParams>({
    mutationFn: (params: CreateFeatureParams) => featuresService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
  });
};

export const useUpdateFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Feature, Error, UpdateFeatureParams>({
    mutationFn: (params: UpdateFeatureParams) => featuresService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
  });
};

export const useDeleteFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Feature, Error, DeleteFeatureParams>({
    mutationFn: (params: DeleteFeatureParams) =>
      featuresService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllFeaturesKey({ characterId }),
      });
    },
  });
};
