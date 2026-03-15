type GetGeneralInfoParams = {
  characterId?: number;
};

type UpdateGeneralInfoParams = {
  characterId: number;
  hitPoints?: number;
  hitPointsLimit?: number;
  hitPointsLimitTemporary?: number;
  temporaryHitPoints?: number | null;
  armorClassBase?: number;
  armorClassFirstAttribute?: AttributesType | null;
  armorClassSecondAttribute?: AttributesType | null;
  speed?: number | null;
  hitDices?: number;
  hitDicesMaximum?: number;
  hitDicesSize?: HitDicesType;
  speedClimbing?: number | null;
  speedFlying?: number | null;
  initiativeCustomBonus?: number;
  initiaveExtraAttribute?: AttributesType | null;
  passivePerceptionCustomBonus?: number;
  passivePerceptionExtraAttribute?: AttributesType | null;
  exhaustion?: number;
};
