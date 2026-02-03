import api from 'core/api';
import { Resource } from 'types/character';

export const resourcesService = {
  fetchAll: ({ characterId }: GetAllResourcesParams) =>
    api
      .get<Resource[]>(`/characters/${characterId}/resources`)
      .then((res) => res.data),
  create: (params: CreateResourceParams) =>
    api
      .post<Resource>(`/characters/${params.characterId}/resources`, params)
      .then((res) => res.data),
  update: (params: UpdateResourceParams) =>
    api
      .put<Resource>(
        `/characters/${params.characterId}/resources/${params.id}`,
        params,
      )
      .then((res) => res.data),
  destroy: (params: DeleteResourceParams) =>
    api
      .delete<Resource>(
        `/characters/${params.characterId}/resources/${params.id}`,
      )
      .then((res) => res.data),
};
