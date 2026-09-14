import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Skull } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import i18n from '@/i18n';
import { useGetNpcs, useImportNpcMutation } from '@/services/npcs/npc.api';
import type { NpcSummary } from '@/types/npc';

type NpcSelectorProps = {
  characterId: number;
};

const NpcSelectorEmpty = () => (
  <View className="items-center py-16 px-4">
    <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Skull size={32} color="#9ca3af" />
    </View>
    <Text className="text-gray-500 text-center text-lg">
      {i18n.t('npcs.noNpcs')}
    </Text>
  </View>
);

const NpcSelectorError = ({ onRetry }: { onRetry: () => void }) => (
  <View className="items-center py-16 px-4">
    <Text className="text-red-400 text-center text-lg mb-4">
      {i18n.t('npcs.couldNotLoadNpcs')}
    </Text>
    <TouchableOpacity
      onPress={onRetry}
      className="bg-indigo-500 px-6 py-3 rounded-xl"
      activeOpacity={0.8}
    >
      <Text className="text-white font-medium">
        {i18n.t('general.tryAgain')}
      </Text>
    </TouchableOpacity>
  </View>
);

export const NpcSelector = ({ characterId }: NpcSelectorProps) => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { data: npcs = [], isError, isLoading, refetch } = useGetNpcs();
  const { mutate: importNpc, isPending } = useImportNpcMutation();

  const selectNpc = (npc: NpcSummary) => {
    if (isPending) return;

    importNpc(
      { id: npc.id, params: { characterId } },
      { onSuccess: () => router.back() },
    );
  };

  const renderItem = ({ item }: { item: NpcSummary }) => (
    <TouchableOpacity
      onPress={() => selectNpc(item)}
      disabled={isPending}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center mr-3">
          <Skull size={24} color="#4f46e5" />
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-base text-gray-800">
            {item.name}
          </Text>
          <Text className="text-gray-400 text-sm">
            {i18n.t('titles.hp')}: {item.hitPoints}
          </Text>
        </View>

        <View className="bg-indigo-50 rounded-full px-3 py-1">
          <Text className="text-indigo-600 text-xs font-semibold">
            {i18n.t('npcs.challengeRating', { rating: item.challengeRating })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-100 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-slate-100">
        <NpcSelectorError onRetry={refetch} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
      {isPending && (
        <View className="flex-row items-center justify-center gap-2 px-4 pt-4">
          <ActivityIndicator color="#4f46e5" />
          <Text className="text-gray-600">{i18n.t('general.loading')}</Text>
        </View>
      )}

      <FlashList
        className="flex-1 px-4"
        data={npcs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<NpcSelectorEmpty />}
        contentContainerClassName="pt-4"
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
