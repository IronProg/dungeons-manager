import api from '@/core/api/api';
import type { Background } from '@/types/character';

export const backgroundService = {
  fetch: ({ characterId }: GetBackgroundParams) =>
    api
      .get<Background>(`/characters/${characterId}/background`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateBackgroundParams) =>
    api
      .put<Background>(`characters/${params.characterId}/backgrounds`, params)
      .then((res) => res.data),
};
