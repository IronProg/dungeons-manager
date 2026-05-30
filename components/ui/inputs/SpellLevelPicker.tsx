import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

import { SPELL_SLOT_LEVELS } from '@/core/enums/spellSlotLevel';
import { colors } from '@/core/utils/colors';
import i18n from '@/i18n';
import type { SpellSlotLevelType } from '@/types/character';

type SpellLevelPickerProps = {
  value?: SpellSlotLevelType;
  onChange?: (value: SpellSlotLevelType) => void;
  error?: string;
};

export const SpellLevelPicker = ({
  value,
  onChange = () => {},
  error,
}: SpellLevelPickerProps) => {
  return (
    <View className="flex-1">
      <View className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-11 w-full">
        <Picker
          style={styles.picker}
          selectedValue={value}
          dropdownIconColor={colors.gray[900]}
          onValueChange={(itemValue) => itemValue && onChange(itemValue)}
        >
          {SPELL_SLOT_LEVELS.map((lvl) => (
            <Picker.Item
              key={lvl}
              label={lvl === 0 ? i18n.t('spells.cantrip') : `${lvl}`}
              value={lvl}
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
