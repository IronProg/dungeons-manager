import { Redirect, Stack } from 'expo-router';

import { useGetCurrentUser } from 'services/auth/auth.api';

export type AuthRoutesStack = { Login: undefined; SignUp: undefined };

export default function AuthNavigator() {
  const { data: currentUser, isFetching, isError } = useGetCurrentUser();

  if (currentUser && !isFetching && !isError) {
    return <Redirect href={'/(authenticated)/(drawer)/(tabs)'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
