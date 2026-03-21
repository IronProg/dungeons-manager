import { useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Plus, Minus, RotateCcw } from 'lucide-react-native';
import i18n from 'i18n';

import {
  useGetCharacterSpellSlots,
  useResetAllSpellSlotsMutation,
  useUpdateSpellSlotMutation,
} from 'services/spellSlots/spellSlot';

import { SpellSlotLevelType } from 'types/character';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

interface SpellSlotsHeaderProps {
  level: SpellSlotLevelType;
}

export const SpellSlotsHeader = ({ level }: SpellSlotsHeaderProps) => {
  const [resetting, setResetting] = useState(false);

  const { data: slots, isLoading: isLoadingSlots } =
    useGetCharacterSpellSlots(level);
  const { mutate: updateSlot } = useUpdateSpellSlotMutation(level);
  const { mutate: resetAllSpellSlots } = useResetAllSpellSlotsMutation();

  const currentSlot = useMemo(
    () => slots?.find((slot) => slot.kind === 'normal' && slot.level === level),
    [slots, level],
  );

  const handleDecreaseSlot = () => {
    if (currentSlot && currentSlot.amount > 0) {
      updateSlot({ id: currentSlot.id, amount: currentSlot.amount - 1 });
    }
  };

  const handleIncreaseSlot = () => {
    if (currentSlot && currentSlot.amount < currentSlot.total) {
      updateSlot({ id: currentSlot.id, amount: currentSlot.amount + 1 });
    }
  };

  const handleResetSlot = () => {
    if (currentSlot) {
      resetAllSpellSlots(null, {
        onSettled: () => setResetting(false),
      });
    }
  };

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex flex-row items-center justify-between z-10 shadow-sm">
      <Text className="text-lg font-bold">{i18n.t('spellSlots.slots')}</Text>

      {isLoadingSlots ? (
        <ActivityIndicator size="small" />
      ) : currentSlot ? (
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleDecreaseSlot}
            className="bg-gray-200 p-2 rounded-full"
          >
            <Minus size={16} color="black" />
          </TouchableOpacity>

          <Text className="text-lg font-bold">
            {currentSlot.amount} / {currentSlot.total}
          </Text>

          <TouchableOpacity
            onPress={handleIncreaseSlot}
            className="bg-gray-200 p-2 rounded-full"
          >
            <Plus size={16} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setResetting(true)}
            className="bg-blue-100 p-2 rounded-full ml-2"
          >
            <RotateCcw size={16} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-gray-500 italic">
          {i18n.t('spellSlots.noSlotsSetup')}
        </Text>
      )}

      <ConfirmationModal
        isVisible={!!resetting}
        onClose={() => setResetting(false)}
        onConfirm={handleResetSlot}
        title={i18n.t('spellSlots.reset')}
        subTitle={i18n.t('spellSlots.resetDescription')}
        buttonClassName="bg-indigo-500"
      />
    </View>
  );
};
