import api from 'core/api/api';
import { Attribute } from 'types/character';

export const attributesService = {
  fetchAll: ({ characterId }: GetAllAttributesParams) =>
    api
      .get<Attribute[]>(`/characters/${characterId}/attributes`)
      .then((res) => res.data),
  updateAll: ({ ...params }: UpdateAllAttributesParams) =>
    api
      .put<
        Attribute[]
      >(`characters/${params.characterId}/attributes/update_all`, params)
      .then((res) => res.data),
};
