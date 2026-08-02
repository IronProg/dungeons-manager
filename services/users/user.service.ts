import api from '@/core/api/api';
import type { User } from '@/types/user';

export const userService = {
  update: (params: UpdateUserParams) =>
    api.patch<User>('/users', params).then((res) => res.data),
};
