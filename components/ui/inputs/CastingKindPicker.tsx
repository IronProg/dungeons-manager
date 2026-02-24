import { CASTING_KINDS } from 'core/enums/castingKinds';
import i18n from 'i18n';
import { ChevronDown } from 'lucide-react-native';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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
      <RNPickerSelect
        onValueChange={onChange}
        placeholder={{}}
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
          ...CASTING_KINDS.map((kind) => ({
            label: i18n.t(`classes.castingKinds.${kind}`),
            value: kind,
          })),
        ]}
      >
        <View className="rounded-lg bg-gray-100 px-4 h-15 py-2.5 flex flex-row justify-between items-center gap-2">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value
              ? i18n.t(`classes.castingKinds.${value}`)
              : i18n.t('general.none')}
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
