import { AuthContext } from 'contexts/AuthContext';
import api from 'core/api';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from 'types/user';

export type AuthProviderProps = {
  user?: User;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  const handleSignin = useCallback(async () => {
    try {
      const { data } = await api.post<User>('login', {
        user: {
          email: 'teste@email.com',
          password: '123456',
        },
      });

      setUser(data);
    } catch (ex) {
      console.error('error at auth', { ex });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      handleSignin();
    }
  }, [handleSignin, user]);

  const value: AuthProviderProps = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
