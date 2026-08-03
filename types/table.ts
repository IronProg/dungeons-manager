import type { Character } from '@/types/character';

export type TableUser = {
  id: number;
  userId: number;
  nickname: string;
  discriminator: string;
  joinedAt: string;
};

export type TableRequestUser = {
  id: number;
  nickname: string;
  discriminator: string;
};

export type TableRequest = {
  id: number;
  tableId: number;
  tableName?: string;
  kind: 'invite' | 'join';
  status: 'pending' | 'accepted' | 'refused' | 'cancelled';
  sender: TableRequestUser;
  receiver: TableRequestUser;
  createdAt: string;
};

export type TableRequestStats = {
  pendingInvites: number;
  pendingJoins: number;
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
