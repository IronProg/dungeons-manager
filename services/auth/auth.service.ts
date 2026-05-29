import api from '@/core/api/api';
import { getRefreshToken } from '@/core/utils/tokens';
import type { TokenResponse, User } from '@/types/user';

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
    api.post<TokenResponse>('/signup', data).then((res) => res.data),
};
