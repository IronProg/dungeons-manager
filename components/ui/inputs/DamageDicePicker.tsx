import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { DAMAGE_DICES } from 'core/enums/damageDices';

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
      <View
        className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12"
        style={{ width: 100 }}
      >
        <Picker
          style={{ width: '100%', height: 50 }}
          selectedValue={value}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          <Picker.Item label={'--'} value={null} />

          {DAMAGE_DICES.map((dice) => (
            <Picker.Item key={dice} label={`d${dice}`} value={dice} />
          ))}
        </Picker>
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};
