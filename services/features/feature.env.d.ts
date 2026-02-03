type GetAllFeaturesParams = {
  characterId?: number;
};

type CreateFeatureParams = {
  characterId: number;
  title?: string;
  description?: string | null;
  origin?: string | null;
};

type UpdateFeatureParams = {
  characterId: number;
  id: number;
  title?: string;
  description?: string | null;
  origin?: string | null;
};

type DeleteFeatureParams = {
  characterId: number;
  id: number;
};
