import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext, useNavigation } from 'expo-router';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  const navigation = useNavigation();

  const { character, initialLoading } = useCharacter();

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

  if (!character && !initialLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error while loading character</Text>
      </View>
    );
  }

  return (
    <TopTabs
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <TopTabs.Screen
        name="index" // Arquivo: app/(drawer)/(tabs)/index.tsx
        options={{ tabBarLabel: i18n.t('tabs.sheet') }}
      />
      <TopTabs.Screen
        name="weapons" // Arquivo: app/(drawer)/(tabs)/weapons.tsx
        options={{ tabBarLabel: i18n.t('tabs.details') }}
      />
    </TopTabs>
  );
}
