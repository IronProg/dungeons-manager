import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import i18n from 'i18n';

import { useGetCharacterSpells } from 'services/spells/spell.api';

import { Container } from 'components/Container';
import { SpellForm } from 'components/Spells/SpellForm/SpellForm';

import { SpellSlotLevelType } from 'types/character';

export default function SpellFormScreen() {
  const router = useRouter();
  const { id, level } = useLocalSearchParams<{ id?: string; level: string }>();
  const spellId = id ? parseInt(id, 10) : undefined;
  const spellLevel = parseInt(level, 10) as SpellSlotLevelType;

  const { data: spells, isLoading } = useGetCharacterSpells(spellLevel);

  const onSuccess = () => {
    router.back();
  };

  const spell = useMemo(
    () => spells?.find((spell) => spell.id === spellId),
    [spells, spellId],
  );

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
          initialData={spell}
          defaultLevel={spellLevel}
          onSuccess={onSuccess}
        />
      )}
    </Container>
  );
}
