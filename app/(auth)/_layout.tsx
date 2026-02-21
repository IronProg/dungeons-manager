import { View } from 'react-native';
import { Stack } from 'expo-router';

export type AuthRoutesStack = {
  Login: undefined;
  SignUp: undefined;
};

export default function AuthNavigator() {
  return (
    <Stack screenOptions={{ header: () => <View /> }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="SignUp" />
    </Stack>
  );
}
