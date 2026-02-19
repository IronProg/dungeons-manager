import api from 'core/api';

import type { Character } from 'types/character';

export const characterService = {
  fetchAll: () => api.get<Character[]>('/characters').then((res) => res.data),
  fetch: ({ id }: GetCharacterParams) =>
    api.get<Character>(`/characters/${id}`).then((res) => res.data),
  create: ({ ...params }: CreateCharacterParams) =>
    api.post<Character>(`/characters`, params).then((res) => res.data),
  update: ({ ...params }: UpdateCharacterParams) =>
    api
      .put<Character>(`/characters/${params.id}`, params)
      .then((res) => res.data),
  destroy: ({ ...params }: DestroyCharacterParams) =>
    api.delete<null>(`/characters/${params.id}`).then((res) => res.data),
};
