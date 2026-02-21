import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Proficiency } from 'types/character';
import { proficiencyService } from './proficiency.service';

export const getProficiencyKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'proficiency'] => [
  'characters',
  characterId,
  'proficiency',
];

export const useGetProficiency = ({ characterId }: GetProficiencyParams) => {
  return useQuery<
    Proficiency,
    Error,
    Proficiency,
    ['characters', number, 'proficiency']
  >({
    queryKey: getProficiencyKey({ characterId: characterId! }),
    queryFn: () => proficiencyService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
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
