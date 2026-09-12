type GetCharacterParams = {
  id?: number;
  preload?: boolean;
};

type CreateCharacterParams = {
  name: string;
  tableId?: number;
};

type UpdateCharacterParams = {
  id: number;
  name?: string;
  experience?: number;
  level?: number;
  proficiencyBonus?: number;
  spellAttribute?: Attribute;
};

type CloneCharacterParams = {
  id: number;
  tableId?: number;
  name?: string;
};

type DestroyCharacterParams = {
  id?: number;
};
