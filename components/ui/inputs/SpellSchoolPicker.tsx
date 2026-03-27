import { Text, View } from 'react-native';
import i18n from 'i18n';

import { SPELL_SCHOOLS } from 'core/enums/spellSchool';

import { SpellSchoolType } from 'types/character';
import { Picker } from '@react-native-picker/picker';
import { colors } from 'core/utils/colors';

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
      <View
        className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-11"
        style={{ width: '100%' }}
      >
        <Picker
          style={{ width: '100%', height: 50, color: colors.gray[900] }}
          selectedValue={value}
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
