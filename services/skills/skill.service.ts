import api from '@/core/api/api';
import type { Skill } from '@/types/character';

export const skillsService = {
  fetchAll: ({ characterId }: GetAllSkillsParams) =>
    api
      .get<Skill[]>(`/characters/${characterId}/skills`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateSkillParams) =>
    api
      .put<Skill>(
        `characters/${params.characterId}/skills/${params.id}`,
        params,
      )
      .then((res) => res.data),
};
