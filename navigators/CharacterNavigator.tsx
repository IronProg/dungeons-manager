import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';

import { WeaponsAndToolsScreen } from 'Screens/WeaponsAndToolsScreen';
import { CharacterSheetScreen } from 'Screens/CharacterSheetScreen';

import type {
  CharacterDrawerProps,
  CharacterRouteProps,
} from './DrawerNavigator';

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
      }}
      tabIndex={0}
    >
      <Tab.Screen
        name="Sheet"
        component={CharacterSheetScreen}
        options={{ tabBarLabel: i18n.t('tabs.sheet') }}
      />
      <Tab.Screen
        name="Details"
        component={WeaponsAndToolsScreen}
        options={{ tabBarLabel: i18n.t('tabs.details') }}
      />
    </Tab.Navigator>
  );
};
