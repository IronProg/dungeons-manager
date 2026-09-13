import { Heart, Minus, Plus } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { getNextNpcHitPoints } from '@/core/helpers/npcHitPoints';
import i18n from '@/i18n';
import { useUpdateNpcMutation } from '@/services/npcs/npc.api';
import type { Npc } from '@/types/npc';

type NpcHitPointsProps = {
  npc: Npc;
};

export const NpcHitPoints = ({ npc }: NpcHitPointsProps) => {
  const { mutate: updateNpc, isPending } = useUpdateNpcMutation();

  const updateHitPoints = (change: number) => {
    if (isPending) return;

    const nextHitPoints = getNextNpcHitPoints(
      npc.hitPoints,
      npc.hitPointsLimit,
      change,
    );

    if (nextHitPoints === npc.hitPoints) return;

    updateNpc({ id: npc.id, params: { hitPoints: nextHitPoints } });
  };

  return (
    <View className="px-4 py-5">
      <View className="items-center">
        <View className="relative h-28 w-28 items-center justify-center">
          <Heart size={112} color="#cbd5e1" fill="#e2e8f0" />
          <View className="absolute items-center">
            <Text className="text-gray-900 text-sm font-semibold">
              {i18n.t('titles.hp')}
            </Text>
            <Text className="text-gray-900 text-3xl font-bold">
              {npc.hitPoints} / {npc.hitPointsLimit}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-3">
          <TouchableOpacity
            onPress={() => updateHitPoints(-1)}
            disabled={isPending || npc.hitPoints === 0}
            className="bg-red-500 h-11 w-24 rounded-xl flex-row items-center justify-center"
            accessibilityLabel={i18n.t('general.damage')}
          >
            <Minus size={20} color="white" />
            <Text className="text-white font-semibold ml-1">1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => updateHitPoints(1)}
            disabled={isPending || npc.hitPoints === npc.hitPointsLimit}
            className="bg-green-600 h-11 w-24 rounded-xl flex-row items-center justify-center"
            accessibilityLabel={i18n.t('general.healing')}
          >
            <Plus size={20} color="white" />
            <Text className="text-white font-semibold ml-1">1</Text>
          </TouchableOpacity>
        </View>

        {isPending && <ActivityIndicator className="mt-3" color="#4f46e5" />}
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-3 mt-5">
        <HitPointValue
          label={i18n.t('general.current')}
          value={npc.hitPoints}
        />
        <HitPointValue
          label={i18n.t('general.maximum')}
          value={npc.hitPointsLimit}
        />
        <HitPointValue
          label={i18n.t('hitPoints.tempMaxHP')}
          value={npc.hitPointsLimitTemporary ?? 0}
        />
        <HitPointValue
          label={i18n.t('general.temporary')}
          value={npc.temporaryHitPoints ?? 0}
        />
      </View>
    </View>
  );
};

const HitPointValue = ({ label, value }: { label: string; value: number }) => (
  <View className="w-[48%] bg-slate-100 rounded-lg px-3 py-2">
    <Text className="text-gray-500 text-xs font-medium">{label}</Text>
    <Text className="text-gray-900 text-lg font-bold">{value}</Text>
  </View>
);
