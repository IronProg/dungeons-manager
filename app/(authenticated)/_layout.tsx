import { Redirect, Stack } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import i18n from 'i18n';

import { colors } from 'core/utils/colors';
import { useGetCurrentUser } from 'services/auth/auth.api';

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
          headerStyle: { backgroundColor: colors.indigo['600'] },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="spell-form"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
