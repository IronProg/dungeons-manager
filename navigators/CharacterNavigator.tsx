import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WeaponsAndToolsScreen } from 'Screens/WeaponsAndToolsScreen';
import { CharacterSheetScreen } from 'Screens/CharacterSheetScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { CharacterRoutesStack } from './DrawerNavigator';
import type { RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { useCharacter } from 'contexts/CharacterContext';
import { ActivityIndicator, Text, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
const Tab = createMaterialTopTabNavigator();

type DrawerProps = DrawerNavigationProp<CharacterRoutesStack>;
type RouteProps = RouteProp<CharacterRoutesStack, 'CharacterSheet'>;

export const CharacterNavigator = () => {
  const navigation = useNavigation<DrawerProps>();
  const { params } = useRoute<RouteProps>();
  const characterId = params?.characterId;

  const { character, setCharacterId, initialLoading } = useCharacter();

  useEffect(() => {
    if (characterId) {
      setCharacterId(characterId);
    }
  });

  useEffect(() => {
    if (character) {
      navigation.setOptions({
        title: character.name,
      });
    }
  }, [character, navigation]);

  if (initialLoading) {
    return (
      <View className="bg-red-600 flex-1 flex flex-col justify-center items-center">
        <View className="bg-blue-600">
          <Text>Loading</Text>
        </View>
        <ActivityIndicator />
      </View>
    );
  }

  if (!character) {
    <Text>Error while loading character</Text>;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarShowIcon: false,
        tabBarStyle: {
          height: 0,
        },
      }}
      tabIndex={0}
    >
      <Tab.Screen name="Sheet" component={CharacterSheetScreen} />
      <Tab.Screen name="Details" component={WeaponsAndToolsScreen} />
    </Tab.Navigator>
  );
};
