import api from 'core/api/api';
import { Attack } from 'types/character';

export const attacksService = {
  fetchAll: ({ characterId }: GetAllAttacksParams) =>
    api
      .get<Attack[]>(`/characters/${characterId}/attacks`)
      .then((res) => res.data),
  create: (params: CreateAttackParams) =>
    api
      .post<Attack>(`/characters/${params.characterId}/attacks`, params)
      .then((res) => res.data),
  update: (params: UpdateAttackParams) =>
    api
      .put<Attack>(
        `/characters/${params.characterId}/attacks/${params.id}`,
        params,
      )
      .then((res) => res.data),
  destroy: (params: DeleteAttackParams) =>
    api
      .delete<Attack>(`/characters/${params.characterId}/attacks/${params.id}`)
      .then((res) => res.data),
};
