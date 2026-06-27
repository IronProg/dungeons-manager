import { Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { DAMAGE_DICES } from '@/core/enums/damageDices';
import i18n from '@/i18n';

const DAMAGE_DICES_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...DAMAGE_DICES.map((dice) => ({
    id: dice,
    label: `d${dice}`,
  })),
];

type DamageDicePickerProps = {
  value?: number | null;
  onChange?: (data: number) => void;
  error?: string;
};

export const DamageDicePicker = ({
  value,
  onChange = () => {},
  error,
}: DamageDicePickerProps) => {
  return (
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12 w-full">
        <SelectPicker
          value={value}
          items={DAMAGE_DICES_OPTIONS}
          error={error}
          onChange={(newValue) => {
            onChange(newValue as number);
          }}
          placeholder={i18n.t('placeholders.damageDice')}
        />
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
