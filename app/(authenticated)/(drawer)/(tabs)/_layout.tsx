import { useEffect } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext, useNavigation } from 'expo-router';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { CharactersTopBarIndicator } from 'components/ui/Layouts/CharactersTopBarIndicator';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const { character, isLoading, initialLoading } = useCharacter();

  useEffect(() => {
    if (character) {
      navigation.setOptions({ title: character.name });
    }
  }, [character, navigation]);

  if (initialLoading || isLoading) {
    return (
      <View className="flex-1 flex flex-col justify-center items-center">
        <Text className="mb-4 text-2xl font-medium">
          {i18n.t('loadings.characters')}
        </Text>

        <ActivityIndicator color={'olive'} size={40} />
      </View>
    );
  }

  if (!character && !initialLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error while loading character</Text>
      </View>
    );
  }

  return (
    <TopTabs
      initialRouteName="index"
      initialLayout={{ width }}
      screenOptions={{
        sceneStyle: { overflow: 'hidden' },
        swipeEnabled: true,
        lazy: true,
        animationEnabled: true,
        tabBarIndicator: (props) => (
          <CharactersTopBarIndicator {...props} navigationState={props.state} />
        ),
      }}
    >
      <TopTabs.Screen
        name="equipments"
        options={{ tabBarLabel: i18n.t('tabs.equipments') }}
      />
      <TopTabs.Screen
        name="index"
        options={{ tabBarLabel: i18n.t('tabs.sheet') }}
      />
      <TopTabs.Screen
        name="weapons"
        options={{ tabBarLabel: i18n.t('tabs.details') }}
      />
      <TopTabs.Screen
        name="spells"
        options={{ tabBarLabel: i18n.t('tabs.spells') }}
      />
    </TopTabs>
  );
}
