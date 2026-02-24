import api from 'core/api/api';
import { CharacterClass } from 'types/character';

export const classService = {
  fetchAll: ({ characterId }: GetAllClassesParams) =>
    api
      .get<CharacterClass[]>(`/characters/${characterId}/classes`)
      .then((res) => res.data),
  updateAll: ({ ...params }: UpdateAllClassesParams) =>
    api
      .put<
        CharacterClass[]
      >(`characters/${params.characterId}/classes/update_all`, params)
      .then((res) => res.data),
};
