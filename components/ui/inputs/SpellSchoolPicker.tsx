import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import { SPELL_SCHOOLS } from '@/core/enums/spellSchool';
import { colors } from '@/core/utils/colors';
import i18n from '@/i18n';
import type { SpellSchoolType } from '@/types/character';

type SpellSchoolPickerProps = {
  value?: SpellSchoolType;
  onChange?: (value: SpellSchoolType) => void;
  error?: string;
};

export const SpellSchoolPicker = ({
  value,
  onChange = () => {},
  error,
}: SpellSchoolPickerProps) => {
  return (
    <View className="flex-1">
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-11 w-full">
        <Picker
          style={styles.picker}
          selectedValue={value}
          dropdownIconColor={colors.gray[900]}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          {SPELL_SCHOOLS.map((school) => (
            <Picker.Item
              key={school}
              label={i18n.t(`spells.schools.${school}`)}
              value={school}
            />
          ))}
        </Picker>
      </View>

      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    color: colors.gray[900],
  },
});
