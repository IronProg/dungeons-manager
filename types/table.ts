import { Character } from './character';

export type Table = {
  id?: number;
  name: string;
  inviteCode?: string;
  usersCount: number;
  charactersCount: number;
  characters: Character[];
};
