import { Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { HIT_DICES } from '@/core/enums/hitDices';
import i18n from '@/i18n';

const HIT_DICES_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...HIT_DICES.map((dice) => ({ id: dice, label: dice })),
];

type HitDicePickerProps = {
  value?: string | null;
  onChange?: (data: string | number | null) => void;
  error?: string;
};

export const HitDicePicker = ({
  value,
  onChange = () => {},
  error,
}: HitDicePickerProps) => {
  return (
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12 w-full">
        <SelectPicker
          value={value}
          items={HIT_DICES_OPTIONS}
          error={error}
          onChange={onChange}
          placeholder={i18n.t('placeholders.hitDice')}
        />
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
