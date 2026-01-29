import api from 'core/api';
import { Character, CharacterGeneralInfo, Currencies } from 'types/character';

export const characterService = {
  fetchAll: () => api.get<Character[]>('/characters').then((res) => res.data),
  fetch: ({ id }: GetCharacterParams) =>
    api.get<Character>(`/characters/${id}`).then((res) => res.data),
  create: ({ ...params }: CreateCharacterParams) =>
    api.post<Character>(`/characters`, params).then((res) => res.data),
  fetchGeneralInfo: ({ characterId }: GetCharacterGeneralInfoParams) =>
    api
      .get<CharacterGeneralInfo>(`/characters/${characterId}/general_info`)
      .then((res) => res.data),
  fetchCurrency: ({ characterId }: GetCharacterCurrencyParams) =>
    api
      .get<Currencies>(`/characters/${characterId}/currency`)
      .then((res) => res.data),
};
