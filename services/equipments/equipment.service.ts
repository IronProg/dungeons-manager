import api from '@/core/api/api';
import type { Equipment } from '@/types/character';

export const equipmentService = {
  fetchAll: ({ characterId }: GetAllEquipmentsParams) =>
    api
      .get<Equipment[]>(`/characters/${characterId}/equipments`)
      .then((res) => res.data),
  create: (params: CreateEquipmentParams) =>
    api
      .post<Equipment>(`/characters/${params.characterId}/equipments`, params)
      .then((res) => res.data),
  update: (params: UpdateEquipmentParams) =>
    api
      .put<Equipment>(
        `/characters/${params.characterId}/equipments/${params.id}`,
        params,
      )
      .then((res) => res.data),
  destroy: (params: DeleteEquipmentParams) =>
    api
      .delete<Equipment>(
        `/characters/${params.characterId}/equipments/${params.id}`,
      )
      .then((res) => res.data),
};
