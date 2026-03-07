import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { DAMAGE_DICES } from 'core/enums/damageDices';
import { cn } from 'core/helpers/cn';

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
        items={DAMAGE_DICES.map((dice) => ({ label: `d${dice}`, value: dice }))}
      >
        <View
          className={cn(
            'rounded-lg bg-gray-100 w-20 px-4 h-15 py-2.5 flex flex-row',
            'justify-between items-center gap-2 text-center',
          )}
          style={{ width: 50 }}
        >
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value}
          </Text>
        </View>
      </RNPickerSelect>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
