type GetTableRequestsParams = {
  status?: 'pending' | 'accepted' | 'refused' | 'cancelled';
  kind?: 'invite' | 'join';
};

type GetTableInvitesParams = {
  tableId: number;
};

type SearchUsersParams = {
  tableId: number;
  nickname?: string;
  discriminator?: string;
  email?: string;
};

type InviteUserParams = {
  tableId: number;
  receiverId: number;
};

type TableRequestActionParams = {
  id: number;
  tableId?: number;
};
