import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { MainNpcSheet } from '@/components/Npcs/Sheet/MainNpcSheet';
import i18n from '@/i18n';
import { useGetNpc } from '@/services/npcs/npc.api';

export default function NpcSheetScreen() {
  const { id: idValue } = useLocalSearchParams<{ id?: string | string[] }>();
  const idText = Array.isArray(idValue) ? idValue[0] : idValue;
  const parsedId = Number.parseInt(idText ?? '', 10);
  const id = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : undefined;
  const { data: npc, isError, isLoading, refetch } = useGetNpc({ id });

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-200 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (isError || !npc) {
    return (
      <View className="flex-1 bg-slate-200 items-center justify-center p-5">
        <Text className="text-red-500 text-center mb-4">
          {i18n.t('npcs.couldNotLoadNpc')}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-indigo-500 px-6 py-3 rounded-xl"
          activeOpacity={0.8}
        >
          <Text className="text-white font-medium">
            {i18n.t('general.tryAgain')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: npc.name }} />
      <MainNpcSheet npc={npc} />
    </>
  );
}
