import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { NpcSelector } from '@/components/Npcs/Library/NpcSelector';
import i18n from '@/i18n';

export default function NpcSelectorScreen() {
  const { characterId: characterIdValue } = useLocalSearchParams<{
    characterId?: string | string[];
  }>();
  const characterIdText = Array.isArray(characterIdValue)
    ? characterIdValue[0]
    : characterIdValue;
  const parsedCharacterId = Number.parseInt(characterIdText ?? '', 10);
  const characterId =
    Number.isFinite(parsedCharacterId) && parsedCharacterId > 0
      ? parsedCharacterId
      : undefined;

  if (!characterId) {
    return (
      <View className="flex-1 bg-slate-100 items-center justify-center p-5">
        <Text className="text-red-500 text-center">
          {i18n.t('general.noDataFound')}
        </Text>
      </View>
    );
  }

  return <NpcSelector characterId={characterId} />;
}
