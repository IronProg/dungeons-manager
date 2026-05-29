import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { SpellForm } from '@/components/Spells/SpellForm/SpellForm';
import i18n from '@/i18n';
import {
  getExternalSpellById,
  initExternalSpellsDb,
} from '@/services/spellLists/spellList.service';
import { useGetCharacterSpells } from '@/services/spells/spell.api';
import type { SpellSlotLevelType } from '@/types/character';

export default function SpellFormScreen() {
  const router = useRouter();
  const { id, level, importedSpellId } = useLocalSearchParams<{
    id?: string;
    level: string;
    importedSpellId?: string;
  }>();

  const spellId = id ? parseInt(id, 10) : undefined;
  const spellLevel = parseInt(level, 10) as SpellSlotLevelType;
  const parsedImportedSpellId = importedSpellId
    ? parseInt(importedSpellId, 10)
    : undefined;

  useEffect(() => {
    if (parsedImportedSpellId) initExternalSpellsDb();
  }, [parsedImportedSpellId]);

  const { data: spells, isLoading } = useGetCharacterSpells(spellLevel);

  const onSuccess = () => router.back();

  const importedSpell = (() => {
    if (!parsedImportedSpellId) return undefined;

    const data = getExternalSpellById(parsedImportedSpellId);

    if (data) return { ...data, id: undefined };

    return undefined;
  })();

  const spell = spells?.find((s) => s.id === spellId);

  const initialData = spellId ? spell : importedSpell;

  return (
    <>
      <Stack.Screen
        options={{
          title: spellId ? i18n.t('spells.edit') : i18n.t('spells.new'),
        }}
      />
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <SpellForm
          initialData={initialData}
          defaultLevel={spellLevel}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}
