import api from 'core/api/api';
import { Currencies } from 'types/character';

export const currenciesService = {
  fetch: ({ characterId }: GetCharacterCurrencyParams) =>
    api
      .get<Currencies>(`/characters/${characterId}/currencies`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateGeneralInfoParams) =>
    api
      .put<Currencies>(`characters/${params.characterId}/currencies`, params)
      .then((res) => res.data),
};
