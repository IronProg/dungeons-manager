import api from 'core/api';
import { Character, CharacterGeneralInfo } from 'types/character';

export const generalInfoService = {
  fetch: ({ characterId }: GetGeneralInfoParams) =>
    api
      .get<CharacterGeneralInfo>(`/characters/${characterId}/general_info`)
      .then((res) => res.data),
  update: ({ ...params }: UpdateGeneralInfoParams) =>
    api
      .put<Character>(`characters/${params.characterId}/general_infos`, params)
      .then((res) => res.data),
};
