import { Tent } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import { HitDicesForm } from '@/components/CharacterSheet/HitPoints/HitDices/HitDicesForm';
import { HitDicesRollForm } from '@/components/CharacterSheet/HitPoints/HitDices/HitDicesRollModal';
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import i18n from '@/i18n';
import { useGetAllClasses } from '@/services/classes/class';
import type { CharacterGeneralInfo } from '@/types/character';

type HitDicesProps = {
  generalInfo: CharacterGeneralInfo;
  canEdit: boolean;
};

export const HitDices = ({ canEdit }: HitDicesProps) => {
  const { data: characterClasses } = useGetAllClasses();

  const [open, setOpen] = useState(false);

  const ref = useRef<AdaptiveBottomSheetHandle<boolean>>(null);

  const { hitDicesMaximum, hitDiceAmount } = {
    hitDicesMaximum:
      characterClasses?.reduce((acc, item) => acc + item.level, 0) ?? 0,
    hitDiceAmount:
      characterClasses?.reduce((acc, item) => acc + item.hitDiceAmount, 0) ?? 0,
  };

  return (
    <>
      <TouchableOpacity
        disabled={!canEdit}
        onPress={() => setOpen(true)}
        onLongPress={() => ref.current?.show(true)}
        className="relative flex flex-col items-center justify-center w-[90px]"
      >
        <Tent size={90} color="#cbd5e1" fill="#e2e8f0" />

        <View className="absolute flex flex-col items-center justify-center h-full w-full">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {i18n.t('titles.hitDices')}
          </Text>
          <Text className="text-2xl font-bold text-center">
            {hitDiceAmount}/{hitDicesMaximum}
          </Text>
        </View>

        <HitDicesRollForm onClose={() => setOpen(false)} open={open} />
      </TouchableOpacity>

      <Portal>
        <AdaptiveBottomSheet
          ref={ref}
          renderContent={() => <HitDicesForm />}
        />
      </Portal>
    </>
  );
};
