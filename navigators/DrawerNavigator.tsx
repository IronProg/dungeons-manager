import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { CharacterNavigator } from './CharacterNavigator';
import { useGetAllCharacters } from 'services/characters/character';
import { ActivityIndicator, Text, View } from 'react-native';
import { CharactersDrawer } from 'components/Characters/CharactersDrawer';
import i18n from 'i18n';
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
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CharactersDrawer characters={characters || []} {...props} />
        )}
        initialRouteName={
          characters && characters.length > 0
            ? 'CharacterSheet'
            : 'NewCharacter'
        }
      >
        {characters && characters.length > 0 && (
          <Drawer.Screen
            options={{
              drawerPosition: 'right',
              title: i18n.t('titles.character'),
              headerStyle: { backgroundColor: '#94a3b8' },
            }}
            initialParams={{ characterId: characters[0].id }}
            name="CharacterSheet"
            component={CharacterNavigator}
          />
        )}
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
    </NavigationContainer>
  );
};
