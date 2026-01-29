import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CharacterNavigator } from './CharacterNavigator';
import { useGetAllCharacters } from 'services/characters/character';
import { ActivityIndicator } from 'react-native';
import { CharactersDrawer } from 'components/Characters/CharactersDrawer';

export type CharacterRoutesStack = {
  CharacterSheet: { characterId: number };
};

const Drawer = createDrawerNavigator<CharacterRoutesStack>();

export const DrawerNavigator = () => {
  const { data: characters, isLoading } = useGetAllCharacters();

  if (isLoading) {
    return null;
  }

  if (!characters || characters.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CharactersDrawer characters={characters} {...props} />
        )}
      >
        <Drawer.Screen
          options={{
            drawerPosition: 'right',
            title: 'Rotaaas',
            headerStyle: { backgroundColor: '#aa9' },
          }}
          initialParams={{ characterId: characters[0].id }}
          name="CharacterSheet"
          component={CharacterNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
