import { Heart } from 'lucide-react-native';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import type { HitPointsFormProps } from '@/components/CharacterSheet/HitPoints/HitPoints/HitPointsForm';
import { HitPointsForm } from '@/components/CharacterSheet/HitPoints/HitPoints/HitPointsForm';
import type { HitPointsModifierFormProps } from '@/components/CharacterSheet/HitPoints/HitPoints/HitPointsModifierForm';
import { HitPointsModifierForm } from '@/components/CharacterSheet/HitPoints/HitPoints/HitPointsModifierForm';
import { DisposableBottomSheet } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import type { DisposableBottomSheetHandle } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import i18n from '@/i18n';
import type { CharacterGeneralInfo } from '@/types/character';

type HitPointsProps = {
  generalInfo: CharacterGeneralInfo;
  canEdit: boolean;
};

const hitPointsSnapPoints = [350];
const modifierSnapPoints = [290];

export const HitPoints = ({ generalInfo, canEdit }: HitPointsProps) => {
  const hitPointsRef =
    useRef<DisposableBottomSheetHandle<HitPointsFormProps>>(null);
  const modifierRef =
    useRef<DisposableBottomSheetHandle<HitPointsModifierFormProps>>(null);
  const hitPointsMaximum =
    generalInfo.hitPointsLimitTemporary ?? generalInfo.hitPointsLimit;

  return (
    <>
      <TouchableOpacity
        disabled={!canEdit}
        onLongPress={() => hitPointsRef.current?.show({ generalInfo })}
        onPress={() => modifierRef.current?.show({ generalInfo })}
        className="relative flex flex-col items-center justify-center w-[90px]"
      >
        <Heart size={90} color="#cbd5e1" fill="#e2e8f0" />

        <View className="absolute flex flex-col items-center justify-center h-full w-full">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {i18n.t('titles.hp')}
          </Text>

          <View className="flex flex-col">
            <Text className="text-2xl font-bold text-center">
              {generalInfo.hitPoints} / {hitPointsMaximum}
            </Text>

            {generalInfo.temporaryHitPoints &&
              generalInfo.temporaryHitPoints > 0 && (
                <Text className="text-2xl font-bold text-center">
                  ({generalInfo.temporaryHitPoints})
                </Text>
              )}
          </View>
        </View>
      </TouchableOpacity>

      <Portal>
        <DisposableBottomSheet
          ref={hitPointsRef}
          snapPoints={hitPointsSnapPoints}
          renderContent={({ params }) => <HitPointsForm {...params} />}
        />

        <DisposableBottomSheet
          ref={modifierRef}
          snapPoints={modifierSnapPoints}
          renderContent={({ params }) => <HitPointsModifierForm {...params} />}
        />
      </Portal>
    </>
  );
};
