type GetCharacterCurrencyParams = {
  characterId?: number;
};

type UpdateCurrenciesParams = {
  characterId: number;
  copperPoints?: number;
  silverPoints?: number;
  electrumPoints?: number;
  goldPoints?: number;
  platinumPoints?: number;
};
