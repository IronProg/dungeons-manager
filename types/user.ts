export type User = {
  id?: number;
  email: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
