import { Redirect, Stack } from 'expo-router';
import i18n from 'i18n';

import { useGetCurrentUser } from 'services/auth/auth.api';

import { useKeepAwake } from 'expo-keep-awake';

export default function RootLayout() {
  const { data: user, isFetching } = useGetCurrentUser();
  useKeepAwake();

  if (!user && !isFetching) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="character-details"
        options={{
          presentation: 'modal',
          headerTitle: i18n.t('titles.characterDetails'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
    </Stack>
  );
}
