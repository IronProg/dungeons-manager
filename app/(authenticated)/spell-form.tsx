import React, { useMemo, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import i18n from 'i18n';

import { useGetCharacterSpells } from 'services/spells/spell.api';
import {
  getExternalSpellById,
  initExternalSpellsDb,
} from 'services/spellLists/spellList.service';

import { Container } from 'components/Container';
import { SpellForm } from 'components/Spells/SpellForm/SpellForm';

import { SpellSlotLevelType } from 'types/character';

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

  const importedSpell = useMemo(() => {
    if (!parsedImportedSpellId) return undefined;

    const data = getExternalSpellById(parsedImportedSpellId);

    if (data) return { ...data, id: undefined };

    return undefined;
  }, [parsedImportedSpellId]);

  const spell = useMemo(
    () => spells?.find((s) => s.id === spellId),
    [spells, spellId],
  );

  const initialData = spellId ? spell : importedSpell;

  return (
    <Container>
      <Stack.Screen
        options={{
          headerTitle: spellId ? i18n.t('spells.edit') : i18n.t('spells.new'),
          headerShown: true,
          headerLeft: () => null,
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
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
    </Container>
  );
}
