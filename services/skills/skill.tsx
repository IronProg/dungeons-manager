import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { skillsService } from '@/services/skills/skill.service';
import type { Skill } from '@/types/character';

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
    enabled: !!character,
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Skill, AxiosError<ApiErrorResponse>, UpdateSkillParams>({
    mutationFn: (params: UpdateSkillParams) => skillsService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllSkillsKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
