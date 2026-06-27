import { Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { CASTING_KINDS } from '@/core/enums/castingKinds';
import i18n from '@/i18n';

const SPELL_SCHOOLS_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...CASTING_KINDS.map((castingKind) => ({
    id: castingKind,
    label: i18n.t(`classes.castingKinds.${castingKind}`),
  })),
];

type CastingKindPickerProps = {
  value?: string | null;
  onChange?: (data: string | number | null) => void;
  error?: string;
};

export const CastingKindPicker = ({
  value,
  onChange = () => {},
  error,
}: CastingKindPickerProps) => {
  return (
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12 w-full">
        <SelectPicker
          value={value}
          items={SPELL_SCHOOLS_OPTIONS}
          error={error}
          onChange={onChange}
          placeholder={i18n.t('placeholders.castingKind')}
        />
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
