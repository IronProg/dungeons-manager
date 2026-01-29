import api from 'core/api';
import { Resource } from 'types/character';

export const resourcesService = {
  fetchAll: ({ characterId }: GetAllResourcesParams) =>
    api
      .get<Resource[]>(`/characters/${characterId}/resources`)
      .then((res) => res.data),
};
