import { NavigationContainer } from '@react-navigation/native';

import { useGetCurrentUser } from 'services/auth/auth.api';

import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';

export const Navigators = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};
