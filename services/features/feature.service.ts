import api from 'core/api/api';
import { Feature } from 'types/character';

export const featuresService = {
  fetchAll: ({ characterId }: GetAllFeaturesParams) =>
    api
      .get<Feature[]>(`/characters/${characterId}/features`)
      .then((res) => res.data),
  create: (params: CreateFeatureParams) =>
    api
      .post<Feature>(`/characters/${params.characterId}/features`, params)
      .then((res) => res.data),
  update: (params: UpdateFeatureParams) =>
    api
      .put<Feature>(
        `/characters/${params.characterId}/features/${params.id}`,
        params,
      )
      .then((res) => res.data),
  destroy: (params: DeleteFeatureParams) =>
    api
      .delete<Feature>(
        `/characters/${params.characterId}/features/${params.id}`,
      )
      .then((res) => res.data),
};
