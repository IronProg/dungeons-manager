import api from 'core/api';
import { Feature } from 'types/character';

export const featuresService = {
  fetchAll: ({ characterId }: GetAllFeaturesParams) =>
    api
      .get<Feature[]>(`/characters/${characterId}/resources`)
      .then((res) => res.data),
};
