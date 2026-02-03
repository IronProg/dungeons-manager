type GetAllSkillsParams = {
  characterId?: number;
};

type UpdateSkillParams = {
  characterId: number;
  id: number;
  proficiency?: boolean;
  expertise?: boolean;
  customBonus?: number | null;
  extraAttribute?: AttributesType | null;
};
