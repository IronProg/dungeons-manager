import { useQuery } from '@tanstack/react-query';
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
