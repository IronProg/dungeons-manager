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

type CloneCharacterParams = {
  id: number;
  tableId?: number;
  name?: string;
};

type DestroyCharacterParams = {
  id?: number;
};
