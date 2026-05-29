import type { Character } from '@/types/character.ts';

export type TableUser = {
  id: number;
  email: string;
  joinedAt: string;
};

export type Table = {
  id?: number;
  name: string;
  inviteCode?: string;
  usersCount: number;
  charactersCount: number;
  isCreator?: boolean;
  characters: Character[];
  tablesUsers: TableUser[];
};
