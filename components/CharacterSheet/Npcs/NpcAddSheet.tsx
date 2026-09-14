import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { useCharacter } from '@/contexts/CharacterContext';
import { colors } from '@/core/utils/colors';
import i18n from '@/i18n';

type NpcAddSheetParams = {
  characterId: number;
};

export const NpcAddSheet = () => {
  const router = useRouter();
  const { characterId, canEdit } = useCharacter();
  const ref = useRef<AdaptiveBottomSheetHandle<NpcAddSheetParams>>(null);

  if (!characterId || !canEdit) return null;

  const openExistingNpcs = (params: NpcAddSheetParams, onClose: () => void) => {
    onClose();
    router.push({
      pathname: '/(authenticated)/npc-selector',
      params: { characterId: params.characterId.toString() },
    });
  };

  const openNewNpc = (params: NpcAddSheetParams, onClose: () => void) => {
    onClose();
    router.push({
      pathname: '/(authenticated)/npc-name',
      params: { characterId: params.characterId.toString() },
    });
  };

  return (
    <>
      <TouchableOpacity
        hitSlop={10}
        onPress={() => ref.current?.show({ characterId })}
        className="bg-white shadow-indigo-600 shadow-sm rounded-full w-10 h-10 flex items-center justify-center"
        accessibilityLabel={i18n.t('npcs.addSheet')}
      >
        <Plus size={24} color={colors.indigo[600]} />
      </TouchableOpacity>

      <Portal>
        <AdaptiveBottomSheet
          ref={ref}
          renderContent={({ params, onClose }) => (
            <View className="gap-4">
              <Text className="text-xl text-center font-semibold text-gray-900">
                {i18n.t('npcs.addSheet')}
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => openExistingNpcs(params, onClose)}
                  className="flex-1 rounded-xl bg-indigo-500 px-4 py-4"
                  activeOpacity={0.8}
                >
                  <Text className="text-center font-semibold text-white">
                    {i18n.t('npcs.existing')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openNewNpc(params, onClose)}
                  className="flex-1 rounded-xl bg-green-600 px-4 py-4"
                  activeOpacity={0.8}
                >
                  <Text className="text-center font-semibold text-white">
                    {i18n.t('npcs.new')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Portal>
    </>
  );
};
