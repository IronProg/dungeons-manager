import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter, useSegments } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Menu } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { CharacterDetailsButton } from '@/components/CharacterSheet/CharacterDetailsButton';
import { MainMenu } from '@/components/MainMenu';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useSignOutMutation } from '@/services/auth/auth.api';
import { useGetAllCharacters } from '@/services/characters/character.api';

export default function DrawerLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { data: characters, isLoading } = useGetAllCharacters();
  const { mutate: signOut } = useSignOutMutation();
  const { characterId } = useCharacter();

  const isCharacterRoute = segments.includes('(tabs)');

  useEffect(() => {
    if (!isLoading && !characterId && characters && isCharacterRoute) {
      router.replace('/(authenticated)/(drawer)/my-characters');
    }
  }, [isLoading, characterId, characters, isCharacterRoute, router]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="olive" size={40} />
      </View>
    );
  }

  return (
    <Drawer
      drawerContent={(props) => <MainMenu {...props} onLogout={signOut} />}
      screenOptions={{
        drawerPosition: 'right',
        headerStyle: { backgroundColor: '#4f46e5' },
        headerTitleStyle: { color: 'white', paddingRight: 20 },
        headerRight: () => <DrawerToggleButton />,
        swipeEnabled: false,
        lazy: true,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: i18n.t('titles.character'),
          headerLeft: () => (
            <View className="flex flex-row gap-2 ml-1">
              <CharacterDetailsButton />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="my-characters"
        options={{ title: i18n.t('titles.characters') }}
      />

      <Drawer.Screen
        name="tables"
        options={{
          title: i18n.t('tables.title'),
        }}
      />

      <Drawer.Screen
        name="new-character"
        options={{ title: i18n.t('titles.newCharacter') }}
      />

      <Drawer.Screen
        name="new-table"
        options={{ title: i18n.t('titles.newTable') }}
      />

      <Drawer.Screen
        name="options"
        options={{ title: i18n.t('titles.options') }}
      />

      <Drawer.Screen
        name="dm-dashboard"
        options={{
          title: i18n.t('titles.dmDashboard'),
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}

export function DrawerToggleButton() {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      hitSlop={10}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      className="w-14 flex items-center justify-center"
    >
      <Menu size={24} color="white" />
    </TouchableOpacity>
  );
}
