import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { View } from 'react-native';
import { LoginScreen } from 'Screens/LoginScreen';
import { SignUpScreen } from 'Screens/SignUpScreen';

export type AuthRoutesStack = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthStackProps = StackNavigationProp<AuthRoutesStack>;
export type AuthRouteProps = RouteProp<AuthRoutesStack, 'Login'>;

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ header: () => <View /> }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);
