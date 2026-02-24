import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Proficiency } from 'types/character';
import { proficiencyService } from './proficiency.service';
import { useCharacter } from 'contexts/CharacterContext';

export const getProficiencyKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'proficiency'] => [
  'characters',
  characterId,
  'proficiency',
];

export const useGetProficiency = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Proficiency,
    Error,
    Proficiency,
    ['characters', number, 'proficiency']
  >({
    queryKey: getProficiencyKey({ characterId: characterId! }),
    queryFn: () => proficiencyService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateProficiencyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Proficiency, Error, UpdateProficiencyParams>({
    mutationFn: (params: UpdateProficiencyParams) =>
      proficiencyService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getProficiencyKey({ characterId }),
      });
    },
  });
};
