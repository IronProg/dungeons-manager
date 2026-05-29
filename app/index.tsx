import { Redirect } from 'expo-router';

import { useGetCurrentUser } from '@/services/auth/auth.api';

export default function Navigators() {
  const { data: user } = useGetCurrentUser();

  return user ? (
    <Redirect withAnchor href="/(auth)/login" />
  ) : (
    <Redirect withAnchor href="/(authenticated)/(drawer)/(tabs)" />
  );
}
