type GetCharacterParams = {
  id?: number;
};

type CreateCharacterParams = {
  name: string;
};

type UpdateCharacterParams = {
  id: number;
  name?: string;
  experience?: number;
  level?: number;
  proficiency?: number;
};

type DestroyCharacterParams = {
  id?: number;
};
