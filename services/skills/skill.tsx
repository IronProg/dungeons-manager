import { useQuery } from '@tanstack/react-query';
import { skillsService } from './skill.service';
import { Skill } from 'types/character';

export const getAllSkillsKey = ({
  characterId,
}: GetAllSkillsParams): ['characters', number, 'skills'] => [
  'characters',
  characterId,
  'skills',
];

export const useGetAllSkills = ({ characterId }: GetAllSkillsParams) => {
  return useQuery<Skill[], Error, Skill[], ['characters', number, 'skills']>({
    queryKey: getAllSkillsKey({ characterId }),
    queryFn: () => skillsService.fetchAll({ characterId }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};
