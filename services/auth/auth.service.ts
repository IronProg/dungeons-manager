import api from 'core/api/api';
import refreshApi from 'core/api/refresh-api';
import { getRefreshToken } from 'core/utils/tokens';

import { TokenResponse, User } from 'types/user';

export const authService = {
  validateToken: () => api.get<User>('/sessions').then((res) => res.data),
  signIn: (data: SignInParams) =>
    api.post<TokenResponse>('/login', data).then((res) => res.data),
  signOut: async () => {
    const refreshToken = await getRefreshToken();

    const res1 = await api.delete('/logout', { params: { refreshToken } });

    return res1.data;
  },
  register: (data: SignUpParams) =>
    api.post('/signup', data).then((res) => res.data),
  refreshToken: ({ refreshToken }: { refreshToken: string }) =>
    refreshApi
      .post<TokenResponse>(`/refresh_token`, { refresh_token: refreshToken })
      .then((res) => res.data),
};
