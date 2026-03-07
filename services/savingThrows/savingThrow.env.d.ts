type GetAllSavingThrowsParams = {
  characterId?: number;
};

type UpdateSavingThrowParams = {
  characterId: number;
  id: number;
  proficiency?: boolean;
  customBonus?: number | null;
  extraAttribute?: AttributesType | null;
};
