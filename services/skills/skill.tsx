import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { skillsService } from './skill.service';
import { Skill } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';

export const getAllSkillsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'skills'] => ['characters', characterId, 'skills'];

export const useGetAllSkills = () => {
  const { character, characterId } = useCharacter();

  return useQuery<Skill[], Error, Skill[], ['characters', number, 'skills']>({
    queryKey: getAllSkillsKey({ characterId: characterId! }),
    queryFn: () => skillsService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, UpdateSkillParams>({
    mutationFn: (params: UpdateSkillParams) => skillsService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllSkillsKey({ characterId }),
      });
    },
  });
};
