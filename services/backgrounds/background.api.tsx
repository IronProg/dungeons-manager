import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Background } from 'types/character';
import { backgroundService } from './background.service';

export const getBackgroundKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'background'] => [
  'characters',
  characterId,
  'background',
];

export const useGetBackground = ({ characterId }: GetBackgroundParams) => {
  return useQuery<
    Background,
    Error,
    Background,
    ['characters', number, 'background']
  >({
    queryKey: getBackgroundKey({ characterId: characterId! }),
    queryFn: () => backgroundService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};

export const useUpdateBackgroundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Background, Error, UpdateBackgroundParams>({
    mutationFn: (params: UpdateBackgroundParams) =>
      backgroundService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getBackgroundKey({ characterId }),
      });
    },
  });
};
