import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import { DAMAGE_DICES } from '@/core/enums/damageDices';
import { colors } from '@/core/utils/colors';

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
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12 w-full">
        <Picker
          style={styles.picker}
          selectedValue={value}
          dropdownIconColor={colors.gray[900]}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          <Picker.Item label="--" value={null} />

          {DAMAGE_DICES.map((dice) => (
            <Picker.Item key={dice} label={`d${dice}`} value={dice} />
          ))}
        </Picker>
      </View>

      <Text className="text-red-400 text-sm">{error}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    color: colors.gray[900],
  },
});
