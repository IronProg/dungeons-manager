import { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, ParamListBase } from '@react-navigation/native';
import { Menu } from 'lucide-react-native';
import i18n from 'i18n';

import { useGetAllCharacters } from 'services/characters/character.api';
import { useSignOutMutation } from 'services/auth/auth.api';
import { useCharacter } from 'contexts/CharacterContext';
import { useTable } from 'contexts/TableContext';

import { DiceRollProvider } from 'providers/DiceRollProvider';
import { CharactersDrawer } from 'components/Characters/CharactersDrawer';
import { HintsModal } from 'components/CharacterSheet/HintsModal';
import { RollToggleButton } from 'components/Roll/RollToggleButton';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export default function DrawerLayout() {
  const router = useRouter();
  const { data: characters, isLoading } = useGetAllCharacters();
  const { mutate: signOut } = useSignOutMutation();
  const { characterId, setCharacterId } = useCharacter();
  const { table } = useTable();

  useEffect(() => {
    if (!characterId && characters && characters.length > 0) {
      setCharacterId(characters[0].id!);
    } else if (characters?.length === 0) {
      if (table) {
        router.replace('/(authenticated)/(drawer)/new-character');
      } else {
        router.replace('/(authenticated)/(drawer)/tables');
      }
    }
  }, [characterId, characters, router, setCharacterId, table]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="olive" size={40} />
      </View>
    );
  }

  return (
    <DiceRollProvider>
      <Drawer
        drawerContent={(props) => (
          <CharactersDrawer
            {...props}
            characters={characters || []}
            onLogout={signOut}
            onNewCharacter={() => props.navigation.navigate('new-character')}
          />
        )}
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
                <RollToggleButton />

                <HintsModal />
              </View>
            ),
          }}
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
          name="import-character"
          options={{ title: i18n.t('titles.importCharacter') }}
        />

        <Drawer.Screen
          name="new-table"
          options={{ title: i18n.t('titles.newTable') }}
        />

        <Drawer.Screen
          name="dm-dashboard"
          options={{
            title: i18n.t('titles.dmDashboard'),
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </DiceRollProvider>
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
