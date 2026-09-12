import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpellCard } from '@/components/Spells/SpellCard';
import { SpellCastingModal } from '@/components/Spells/SpellCastingModal';
import { SpellCastingStats } from '@/components/Spells/SpellCastingStats';
import { SpellLevelNavigator } from '@/components/Spells/SpellLevelNavigator';
import { SpellsHeader } from '@/components/Spells/SpellsHeader';
import { SpellSlotsHeader } from '@/components/Spells/SpellSlotsHeader';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetCharacterSpells } from '@/services/spells/spell.api';
import type { Spell, SpellSlotLevelType } from '@/types/character';

export const Spells = () => {
  const { bottom } = useSafeAreaInsets();
  const { character, canEdit } = useCharacter();

  const [level, setLevel] = useState<SpellSlotLevelType>(0);
  const [spellToCast, setSpellToCast] = useState<Spell>();

  const { data: spells, isLoading: isLoadingSpells } =
    useGetCharacterSpells(level);

  const spellHeader = (
    <>
      <SpellCastingStats />
      <SpellsHeader level={level} canEdit={canEdit} />
    </>
  );

  return (
    <>
      <View className="flex-1 bg-slate-200">
        {level > 0 && character && <SpellSlotsHeader level={level} />}

        <FlashList
          contentContainerClassName="px-4 "
          contentContainerStyle={{ paddingBottom: bottom + 64 }}
          data={spells}
          keyExtractor={(spell) => spell.id!.toString()}
          renderItem={({ item }) => (
            <SpellCard
              onCast={() => setSpellToCast(item)}
              spell={item}
              canEdit={canEdit}
            />
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
      </View>

      <SpellCastingModal
        spell={spellToCast}
        onClose={() => setSpellToCast(undefined)}
      />
    </>
  );
};
