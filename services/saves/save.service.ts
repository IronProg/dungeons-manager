import api from 'core/api/api';
import { Save } from 'types/character';

export const savesService = {
  fetchAll: ({ characterId }: GetAllSavesParams) =>
    api.get<Save[]>(`/characters/${characterId}/saves`).then((res) => res.data),
  update: ({ ...params }: UpdateSaveParams) =>
    api
      .put<Save>(`characters/${params.characterId}/saves/${params.id}`, params)
      .then((res) => res.data),
};
