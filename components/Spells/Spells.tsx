import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { useGetCharacterSpells } from 'services/spells/spell';

import { SpellCard } from './SpellCard';
import { SpellLevelNavigator } from './SpellLevelNavigator';
import { SpellSlotsHeader } from './SpellSlotsHeader';

import { SpellSlotLevelType } from 'types/character';
import { FlashList } from '@shopify/flash-list';

export const Spells = () => {
  const [level, setLevel] = useState<SpellSlotLevelType>(0);
  const { character } = useCharacter();

  const { data: spells, isLoading: isLoadingSpells } =
    useGetCharacterSpells(level);

  return (
    <View style={{ flex: 1 }}>
      {level > 0 && character && <SpellSlotsHeader level={level} />}

      <FlashList
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        data={spells}
        renderItem={({ item }) => <SpellCard spell={item} />}
        ListEmptyComponent={
          isLoadingSpells ? (
            <ActivityIndicator className="mt-4" />
          ) : (
            <Text className="text-center text-gray-500 mt-4">
              {i18n.t('spells.noneFound')}
            </Text>
          )
        }
      />

      <SpellLevelNavigator setLevel={setLevel} level={level} />
    </View>
  );
};
