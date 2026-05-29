type GetTableParams = {
  id?: number;
};

type CreateTableParams = {
  name: string;
};

type UpdateTableParams = {
  id: number;
  name?: string;
};

type DestroyTableParams = {
  id?: number;
};

type JoinTableParams = {
  inviteCode: string;
};

type RemoveUserParams = {
  tableId: number;
  userId: number;
};
