import api from 'core/api';
import { Attack } from 'types/character';

export const attacksService = {
  fetchAll: ({ characterId }: GetAllAttacksParams) =>
    api
      .get<Attack[]>(`/characters/${characterId}/attacks`)
      .then((res) => res.data),
};
