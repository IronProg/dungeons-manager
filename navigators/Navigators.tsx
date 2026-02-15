import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { useGetCurrentUser } from 'services/auth/auth';

export const Navigators = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};
