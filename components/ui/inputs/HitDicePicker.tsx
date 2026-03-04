import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { HIT_DICES } from 'core/enums/hitDices';

type HitDicePickerProps = {
  value?: string | null;
  onChange?: (data: string | number) => void;
  error?: string;
};

export const HitDicePicker = ({
  value,
  onChange = () => {},
  error,
}: HitDicePickerProps) => {
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
        items={HIT_DICES.map((hitDice) => ({ label: hitDice, value: hitDice }))}
      >
        <View className="rounded-lg bg-gray-100 w-20 px-4 h-15 py-2.5 flex flex-row justify-between items-center gap-2">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value}
          </Text>
        </View>
      </RNPickerSelect>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
