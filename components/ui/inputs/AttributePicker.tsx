import { Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { ATTRIBUTES } from '@/core/enums/attributes';
import i18n from '@/i18n';

const ATTRIBUTES_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...ATTRIBUTES.map((attr) => ({
    id: attr,
    label: i18n.t(`attributes.${attr}`),
  })),
];

type AttributePickerProps = {
  value?: string | null;
  onChange?: (data: string | number | null) => void;
  error?: string;
};

export const AttributePicker = ({
  value,
  onChange = () => {},
  error,
}: AttributePickerProps) => {
  return (
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg h-12 w-full">
        <SelectPicker
          value={value}
          items={ATTRIBUTES_OPTIONS}
          error={error}
          onChange={onChange}
          placeholder={i18n.t('placeholders.attribute')}
        />
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
