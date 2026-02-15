import api from 'core/api';
import { User } from 'types/user';

export const authService = {
  validateToken: () => api.get<User>('/sessions').then((res) => res.data),
  signIn: (data: SignInParams) =>
    api.post<User>('/login', data).then((res) => res.data),
  signOut: () => api.delete('/logout').then((res) => res.data),
  register: (data: SignUpParams) =>
    api.post('/signup', data).then((res) => res.data),
};
