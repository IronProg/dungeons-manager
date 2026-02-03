import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WeaponsAndToolsScreen } from 'Screens/WeaponsAndToolsScreen';
import { CharacterSheetScreen } from 'Screens/CharacterSheetScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  CharacterDrawerProps,
  CharacterRouteProps,
} from './DrawerNavigator';
import { useEffect } from 'react';
import { useCharacter } from 'contexts/CharacterContext';
import { ActivityIndicator, Text, View } from 'react-native';
import i18n from 'i18n';
const Tab = createMaterialTopTabNavigator();

export const CharacterNavigator = () => {
  const navigation = useNavigation<CharacterDrawerProps>();
  const { params } = useRoute<CharacterRouteProps>();
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
      <View className="flex-1 flex flex-col justify-center items-center">
        <Text className="mb-4 text-2xl font-medium">
          {i18n.t('loadings.characters')}
        </Text>

        <ActivityIndicator color={'olive'} size={40} />
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
          padding: 0,
          margin: 0,
        },
      }}
      tabIndex={0}
    >
      <Tab.Screen name="Sheet" component={CharacterSheetScreen} />
      <Tab.Screen name="Details" component={WeaponsAndToolsScreen} />
    </Tab.Navigator>
  );
};
