import api from 'core/api/api';
import { Note } from 'types/character';

export const noteService = {
  fetch: ({ characterId }: GetGeneralInfoParams) =>
    api.get<Note>(`/characters/${characterId}/note`).then((res) => res.data),
  update: ({ ...params }: UpdateGeneralInfoParams) =>
    api
      .put<Note>(`characters/${params.characterId}/notes`, params)
      .then((res) => res.data),
};
