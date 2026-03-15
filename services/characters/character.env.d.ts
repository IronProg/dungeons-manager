type GetCharacterParams = {
  id?: number;
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
};

type DestroyCharacterParams = {
  id?: number;
};
