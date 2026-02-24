import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { classService } from './class.service';
import { CharacterClass } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';

export const getAllClassesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'characterClasses'] => [
  'characters',
  characterId,
  'characterClasses',
];

export const useGetAllClasses = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    CharacterClass[],
    Error,
    CharacterClass[],
    ['characters', number, 'characterClasses']
  >({
    queryKey: getAllClassesKey({ characterId: characterId! }),
    queryFn: () => classService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateAllClassesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CharacterClass[], Error, UpdateAllClassesParams>({
    mutationFn: (params: UpdateAllClassesParams) =>
      classService.updateAll(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId],
      });
    },
  });
};
