import { Heart } from 'lucide-react-native';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import { NpcHitPointsModifierForm } from '@/components/Npcs/Sheet/NpcHitPointsModifierForm';
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { getNpcTemporaryHitPointsText } from '@/core/helpers/npcHitPointDisplay';
import i18n from '@/i18n';
import type { Npc } from '@/types/npc';

type NpcHitPointsProps = {
  npc: Npc;
  onLongPress: () => void;
};

export const NpcHitPoints = ({ npc, onLongPress }: NpcHitPointsProps) => {
  const modifierRef = useRef<AdaptiveBottomSheetHandle<Npc>>(null);

  return (
    <View className="px-4 py-5">
      <TouchableOpacity
        onPress={() => modifierRef.current?.show(npc)}
        onLongPress={onLongPress}
        className="items-center"
      >
        <View className="relative h-28 w-28 items-center justify-center">
          <Heart size={112} color="#cbd5e1" fill="#e2e8f0" />
          <View className="absolute items-center">
            <Text className="text-gray-900 text-sm font-semibold">
              {i18n.t('titles.hp')}
            </Text>
            <Text className="text-gray-900 text-3xl font-bold">
              {npc.hitPoints} / {npc.hitPointsLimit}
            </Text>
            {getNpcTemporaryHitPointsText(npc.temporaryHitPoints) && (
              <Text className="text-gray-900 text-2xl font-bold">
                {getNpcTemporaryHitPointsText(npc.temporaryHitPoints)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

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
      <Portal>
        <AdaptiveBottomSheet
          ref={modifierRef}
          renderContent={({ params }) => (
            <NpcHitPointsModifierForm npc={params} />
          )}
        />
      </Portal>
    </View>
  );
};

const HitPointValue = ({ label, value }: { label: string; value: number }) => (
  <View className="w-[48%] bg-slate-100 rounded-lg px-3 py-2">
    <Text className="text-gray-500 text-xs font-medium">{label}</Text>
    <Text className="text-gray-900 text-lg font-bold">{value}</Text>
  </View>
);
