import { Picker } from '@react-native-picker/picker';
import { ATTRIBUTES } from 'core/enums/attributes';
import { colors } from 'core/utils/colors';
import i18n from 'i18n';
import { Text, View } from 'react-native';

type AttributePickerProps = {
  value?: string | null;
  onChange?: (data: string | number) => void;
  error?: string;
};

export const AttributePicker = ({
  value,
  onChange = () => {},
  error,
}: AttributePickerProps) => {
  return (
    <>
      <View
        className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12"
        style={{ width: '100%' }}
      >
        <Picker
          style={{ width: '100%', height: 50, color: colors.gray[900] }}
          selectedValue={value}
          dropdownIconColor={colors.gray[900]}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          <Picker.Item label={i18n.t('general.none')} value={null} />
          {ATTRIBUTES.map((attr) => (
            <Picker.Item
              key={attr}
              label={i18n.t(`attributes.${attr}`)}
              value={attr}
            />
          ))}
        </Picker>
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
