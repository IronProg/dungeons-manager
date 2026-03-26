import api from 'core/api/api';

import { Spell } from 'types/character';

export const spellService = {
  fetchAll: (characterId: number, level: number) =>
    api
      .get<Spell[]>(`/characters/${characterId}/spells?level=${level}`)
      .then((res) => res.data),
  create: (characterId: number, params: CreateSpellParams) =>
    api
      .post<Spell>(`/characters/${characterId}/spells`, params)
      .then((res) => res.data),
  update: (characterId: number, params: UpdateSpellParams) =>
    api
      .put<Spell>(`/characters/${characterId}/spells/${params.id}`, params)
      .then((res) => res.data),
  delete: (characterId: number, id: number) =>
    api
      .delete<null>(`/characters/${characterId}/spells/${id}`)
      .then((res) => res.data),
};
