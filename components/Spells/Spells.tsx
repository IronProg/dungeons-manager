import React, { useMemo, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { useGetCharacterSpells } from 'services/spells/spell.api';

import { SpellCard } from './SpellCard';
import { SpellLevelNavigator } from './SpellLevelNavigator';
import { SpellSlotsHeader } from './SpellSlotsHeader';
import { SpellsHeader } from './SpellsHeader';
import { SpellCastingModal } from './SpellCastingModal';

import { Spell, SpellSlotLevelType } from 'types/character';

export const Spells = () => {
  const { character } = useCharacter();

  const [level, setLevel] = useState<SpellSlotLevelType>(0);
  const [spellToCast, setSpellToCast] = useState<Spell>();

  const { data: spells, isLoading: isLoadingSpells } =
    useGetCharacterSpells(level);

  const spellHeader = useMemo(() => <SpellsHeader level={level} />, [level]);

  return (
    <View style={{ flex: 1 }}>
      {level > 0 && character && <SpellSlotsHeader level={level} />}

      <FlashList
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        data={spells}
        renderItem={({ item }) => (
          <SpellCard onCast={() => setSpellToCast(item)} spell={item} />
        )}
        ListHeaderComponent={spellHeader}
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

      <SpellCastingModal
        spell={spellToCast}
        onClose={() => setSpellToCast(undefined)}
      />
    </View>
  );
};
