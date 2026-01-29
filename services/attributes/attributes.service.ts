import api from 'core/api';
import { Attribute } from 'types/character';

export const attributesService = {
  fetchAll: ({ characterId }: GetAllAttributesParams) =>
    api
      .get<Attribute[]>(`/characters/${characterId}/attributes`)
      .then((res) => res.data),
};
