import { useQuery } from '@tanstack/react-query';
import { skillsService } from './skill.service';
import { Skill } from 'types/character';

export const getAllSkillsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'skills'] => ['characters', characterId, 'skills'];

export const useGetAllSkills = ({ characterId }: GetAllSkillsParams) => {
  return useQuery<Skill[], Error, Skill[], ['characters', number, 'skills']>({
    queryKey: getAllSkillsKey({ characterId: characterId! }),
    queryFn: () => skillsService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};
