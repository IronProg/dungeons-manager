export type User = {
  id?: number;
  email?: string;
  nickname: string;
  discriminator: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
