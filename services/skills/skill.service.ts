import api from 'core/api';
import { Skill } from 'types/character';

export const skillsService = {
  fetchAll: ({ characterId }: GetAllSkillsParams) =>
    api
      .get<Skill[]>(`/characters/${characterId}/skills`)
      .then((res) => res.data),
};
