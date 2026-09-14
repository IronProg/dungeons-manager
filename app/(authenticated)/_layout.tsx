import { useKeepAwake } from 'expo-keep-awake';
import { Redirect, Stack } from 'expo-router';

import { CustomHeader } from '@/components/ui/CustomHeader';
import i18n from '@/i18n';
import { useGetCurrentUser } from '@/services/auth/auth.api';

export default function RootLayout() {
  const { data: user, isFetching } = useGetCurrentUser();

  useKeepAwake();

  if (!user && !isFetching) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ header: CustomHeader, headerShown: true }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="npc-name"
        options={{
          headerTitle: i18n.t('npcs.new'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="npc-sheet"
        options={{
          headerTitle: i18n.t('npcs.title'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="npc-selector"
        options={{
          headerTitle: i18n.t('npcs.selectNpc'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="npc-general-form"
        options={{
          headerTitle: i18n.t('titles.general'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="npc-attributes-form"
        options={{
          headerTitle: i18n.t('titles.attributes'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="npc-entry-form"
        options={{
          headerTitle: i18n.t('npcs.actions'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="spell-form"
        options={{
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="spell-list"
        options={{
          headerTitle: i18n.t('spellList.title'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen name="edit-table" options={{ headerTintColor: 'white' }} />

      <Stack.Screen
        name="character-details"
        options={{
          presentation: 'modal',
          headerTitle: i18n.t('titles.characterDetails'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="profile/index"
        options={{
          headerTitle: i18n.t('titles.profile'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="profile/edit"
        options={{
          headerTitle: i18n.t('titles.editProfile'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="invite-user"
        options={{
          headerTitle: i18n.t('tableRequests.title'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="table-requests"
        options={{
          headerTitle: i18n.t('tableRequests.title'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="table-invites"
        options={{
          headerTitle: i18n.t('tableRequests.pendingInvites'),
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen name="table-users" options={{ headerTintColor: 'white' }} />
    </Stack>
  );
}
