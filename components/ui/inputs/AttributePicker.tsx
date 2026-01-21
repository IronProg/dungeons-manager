import { ATTRIBUTES } from 'core/enums/attributes';
import i18n from 'i18n';
import { ChevronDown } from 'lucide-react-native';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type AttributePickerProps = {
  value?: string;
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
      <RNPickerSelect
        onValueChange={onChange}
        placeholder="Placeholder"
        value={value}
        useNativeAndroidPickerStyle={false}
        style={{
          viewContainer: {
            backgroundColor: '#f3f3f3ff',
            width: 120,
            borderRadius: 20,
            overflow: 'hidden',
          },
        }}
        items={[
          { label: i18n.t('general.none'), value: null },
          ...ATTRIBUTES.map((attr) => ({
            label: i18n.t(`attributes.${attr}`),
            value: attr,
          })),
        ]}
      >
        <View className="rounded-lg bg-gray-100 px-4 h-15 py-2.5 flex flex-row justify-between items-center gap-2">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value ? i18n.t(`attributes.${value}`) : i18n.t('general.none')}
          </Text>

          <View className="pt-1">
            <ChevronDown size={12} />
          </View>
        </View>
      </RNPickerSelect>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
