import api from '@/core/api/api';
import type { Proficiency } from '@/types/character';

export const proficiencyService = {
  fetch: ({ characterId }: GetProficiencyParams) =>
    api
      .get<Proficiency>(`/characters/${characterId}/proficiency`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateProficiencyParams) =>
    api
      .put<Proficiency>(
        `characters/${params.characterId}/proficiencies`,
        params,
      )
      .then((res) => res.data),
};
