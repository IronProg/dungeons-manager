import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import { HIT_DICES } from '@/core/enums/hitDices';
import { colors } from '@/core/utils/colors';

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
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-12 w-full">
        <Picker
          style={styles.picker}
          dropdownIconColor={colors.gray[900]}
          selectedValue={value}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          {HIT_DICES.map((dice) => (
            <Picker.Item key={dice} label={dice} value={dice} />
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
