type GetAllResourcesParams = {
  characterId?: number;
};

type CreateResourceParams = {
  characterId: number;
  name?: string;
  amount?: number;
  max?: number | null;
};

type UpdateResourceParams = {
  characterId: number;
  id: number;
  name?: string;
  amount?: number;
  max?: number | null;
};

type DeleteResourceParams = {
  characterId: number;
  id: number;
};
