import api from '@/core/api/api';
import type { SavingThrow } from '@/types/character';

export const savingThrowService = {
  fetchAll: ({ characterId }: GetAllSavingThrowsParams) =>
    api
      .get<SavingThrow[]>(`/characters/${characterId}/saving_throws`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateSavingThrowParams) =>
    api
      .put<SavingThrow>(
        `characters/${params.characterId}/saving_throws/${params.id}`,
        params,
      )
      .then((res) => res.data),
};
