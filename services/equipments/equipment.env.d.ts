type GetAllEquipmentsParams = {
  characterId?: number;
};

type CreateEquipmentParams = {
  characterId: number;
  name?: string;
  amount?: number;
  description?: string | null;
};

type UpdateEquipmentParams = {
  characterId: number;
  id: number;
  name?: string;
  amount?: number;
  description?: string | null;
};

type DeleteEquipmentParams = {
  characterId: number;
  id: number;
};
