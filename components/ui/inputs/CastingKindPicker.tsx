import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';

import { CASTING_KINDS } from '@/core/enums/castingKinds';
import { colors } from '@/core/utils/colors';
import i18n from '@/i18n';

type CastingKindPickerProps = {
  value?: string | null;
  onChange?: (data: string | number) => void;
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
        <Picker
          className="w-full h-[50px] color-gray-900"
          selectedValue={value}
          dropdownIconColor={colors.gray[900]}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          <Picker.Item label={i18n.t('general.none')} value={null} />
          {CASTING_KINDS.map((kind) => (
            <Picker.Item
              key={kind}
              label={i18n.t(`classes.castingKinds.${kind}`)}
              value={kind}
            />
          ))}
        </Picker>
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
