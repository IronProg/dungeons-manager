import { ActivityIndicator, Text, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import i18n from 'i18n';

import { useGetAllCharacters } from 'services/characters/character.api';
import { useSignOutMutation } from 'services/auth/auth.api';

import { CharactersDrawer } from 'components/Characters/CharactersDrawer';
import { CharacterNavigator } from './CharacterNavigator';
import { NewCharacterScreen } from 'Screens/NewCharacterScreen';

export type CharacterRoutesStack = {
  CharacterSheet: { characterId: number };
  NewCharacter: undefined;
};

export type CharacterDrawerProps = DrawerNavigationProp<CharacterRoutesStack>;
export type CharacterRouteProps = RouteProp<
  CharacterRoutesStack,
  'CharacterSheet'
>;

const Drawer = createDrawerNavigator<CharacterRoutesStack>();

export const DrawerNavigator = () => {
  const { data: characters, isLoading } = useGetAllCharacters();
  const { mutate: signOut } = useSignOutMutation();

  if (isLoading) {
    return (
      <View className="flex-1 flex flex-col justify-center items-center">
        <Text className="mb-4 text-2xl font-medium">
          {i18n.t('loadings.characters')}
        </Text>

        <ActivityIndicator color={'olive'} size={40} />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CharactersDrawer
          characters={characters || []}
          onLogout={signOut}
          onNewCharacter={() => props.navigation.navigate('NewCharacter')}
          {...props}
        />
      )}
      initialRouteName={
        characters && characters.length > 0 ? 'CharacterSheet' : 'NewCharacter'
      }
    >
      <Drawer.Screen
        options={{
          drawerPosition: 'right',
          title: i18n.t('titles.character'),
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
        }}
        initialParams={{ characterId: characters?.[0]?.id }}
        name="CharacterSheet"
        component={CharacterNavigator}
      />
      <Drawer.Screen
        options={{
          drawerPosition: 'right',
          title: i18n.t('titles.newCharacter'),
          headerStyle: { backgroundColor: '#94a3b8' },
        }}
        name="NewCharacter"
        component={NewCharacterScreen}
      />
    </Drawer.Navigator>
  );
};
