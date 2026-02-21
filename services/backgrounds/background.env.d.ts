type GetBackgroundParams = {
  characterId?: number;
};

type UpdateBackgroundParams = {
  characterId: number;
  alignment?: string;
  background?: string;
  bonds?: string;
  flaws?: string;
  ideals?: string;
  personalityTraits?: string;
  race?: string;
};
