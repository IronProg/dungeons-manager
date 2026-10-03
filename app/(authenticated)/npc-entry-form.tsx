import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { NpcEntryForm } from '@/components/Npcs/Forms/NpcEntryForm';
import i18n from '@/i18n';
import { useGetNpc } from '@/services/npcs/npc.api';
import type { NpcEntryKind } from '@/types/npc';

const entryKinds: NpcEntryKind[] = [
  'trait',
  'reaction',
  'action',
  'legendaryAction',
];

const getValidId = (value?: string | string[]): number | undefined => {
  const idText = Array.isArray(value) ? value[0] : value;
  const id = Number.parseInt(idText ?? '', 10);

  return Number.isFinite(id) && id > 0 ? id : undefined;
};

export default function NpcEntryFormScreen() {
  const {
    npcId: npcIdValue,
    entryId: entryIdValue,
    kind: kindValue,
  } = useLocalSearchParams<{
    npcId?: string | string[];
    entryId?: string | string[];
    kind?: string | string[];
  }>();
  const npcId = getValidId(npcIdValue);
  const entryId = getValidId(entryIdValue);
  const kindText = Array.isArray(kindValue) ? kindValue[0] : kindValue;
  const kind = entryKinds.find((entryKind) => entryKind === kindText);
  const { data: npc, isError, isLoading, refetch } = useGetNpc({ id: npcId });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-200">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (isError || !npc) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-200 p-5">
        <Text className="mb-4 text-center text-red-500">
          {i18n.t('npcs.couldNotLoadNpc')}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="rounded-xl bg-indigo-500 px-6 py-3"
          activeOpacity={0.8}
        >
          <Text className="font-medium text-white">
            {i18n.t('general.tryAgain')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NpcEntryForm
      npc={npc}
      entry={npc.entries.find((entry) => entry.id === entryId)}
      kind={kind}
    />
  );
}
