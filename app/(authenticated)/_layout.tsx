import { Redirect, Stack } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import i18n from 'i18n';

import { useGetCurrentUser } from 'services/auth/auth.api';
import { useTable } from 'contexts/TableContext';
import { TableChannelCallback, useTableChannel } from 'hooks/useTableChannel';
import { useCallback } from 'react';

export default function RootLayout() {
  const { data: user, isFetching } = useGetCurrentUser();
  const { tableId } = useTable();

  useKeepAwake();

  const callback = useCallback((data: TableChannelCallback) => {
    console.log(data);
  }, []);

  useTableChannel({ tableId, callback });

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
