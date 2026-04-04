type GetAllAttacksParams = {
  characterId?: number;
};

type CreateAttackParams = {
  characterId: number;
  name: string;
  mainAttribute?: AttributesType | null;
  applyProficiency: boolean;
  customBonus?: number;
  range?: string;
  properties?: string;
  description?: string;
  damagesAttributes: DamageParams[];
};

type UpdateAttackParams = {
  characterId: number;
  id: number;
  name?: string;
  mainAttribute?: AttributesType | null;
  applyProficiency?: boolean;
  customBonus?: number;
  range?: string;
  properties?: string;
  description?: string;
  damagesAttributes?: DamageParams[];
};

type DeleteAttackParams = {
  characterId: number;
  id: number;
};

type DamageParams = {
  id?: number;
  diceAmount?: number;
  diceSize?: number;
  mainAttribute?: AttributesType | null;
  kind?: string | null;
  customBonus?: number | null;
  _destroy?: boolean | null;
};
