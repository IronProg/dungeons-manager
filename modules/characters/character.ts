import api from 'core/api/api';
import { WithId } from 'modules/modules';
import { Character } from 'types/character';

type CharacterParams = {
  data: {
    name: string;
  };
} & WithId;

export const character = {
  fetch: ({ id }: WithId) => api.get<Character>(`characters/${id}`),
  update: ({ id, data }: CharacterParams) => api.put(`characters/${id}`, data),
};
