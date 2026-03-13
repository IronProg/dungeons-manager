import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, View } from 'react-native';
import i18n from 'i18n';

import { useGetAllCharacters } from 'services/characters/character.api';
import { useSignOutMutation } from 'services/auth/auth.api';
import { CharactersDrawer } from 'components/Characters/CharactersDrawer';
import { useCharacter } from 'contexts/CharacterContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function DrawerLayout() {
  const router = useRouter();
  const { data: characters, isLoading } = useGetAllCharacters();
  const { mutate: signOut } = useSignOutMutation();
  const { characterId, setCharacterId } = useCharacter();

  useEffect(() => {
    if (!characterId && characters && characters.length > 0) {
      setCharacterId(characters[0].id!);
    } else if (characters?.length === 0) {
      router.replace('/(authenticated)/(drawer)/new-character');
    }
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="olive" size={40} />
      </View>
    );
  }

  return (
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
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: i18n.t('titles.character'),
        }}
      />

      <Drawer.Screen
        name="tables"
        options={{
          title: i18n.t('tables.title') || 'Tables',
          headerStyle: { backgroundColor: '#4f46e5' },
        }}
      />

      <Drawer.Screen
        name="new-character"
        options={{
          title: i18n.t('titles.newCharacter'),
          headerStyle: { backgroundColor: '#94a3b8' },
        }}
      />

      <Drawer.Screen
        name="dm-dashboard"
        options={{
          title: 'DM Dashboard',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
