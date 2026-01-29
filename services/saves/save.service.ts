import api from 'core/api';
import { Save } from 'types/character';

export const savesService = {
  fetchAll: ({ characterId }: GetAllSavesParams) =>
    api.get<Save[]>(`/characters/${characterId}/saves`).then((res) => res.data),
};
