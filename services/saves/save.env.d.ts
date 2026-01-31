type GetAllSavesParams = {
  characterId?: number;
};

type UpdateSaveParams = {
  characterId: number;
  id: number;
  proficiency?: boolean;
  customBonus?: number | null;
  extraAttribute?: AttributesType | null;
};
