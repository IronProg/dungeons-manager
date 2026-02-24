import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Background } from 'types/character';
import { backgroundService } from './background.service';
import { useCharacter } from 'contexts/CharacterContext';

export const getBackgroundKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'background'] => [
  'characters',
  characterId,
  'background',
];

export const useGetBackground = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Background,
    Error,
    Background,
    ['characters', number, 'background']
  >({
    queryKey: getBackgroundKey({ characterId: characterId! }),
    queryFn: () => backgroundService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
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
