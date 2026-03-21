import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ChevronDown } from 'lucide-react-native';
import i18n from 'i18n';

import { SPELL_SCHOOLS } from 'core/enums/spellSchool';

import { SpellSchoolType } from 'types/character';

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
      <RNPickerSelect
        onValueChange={onChange}
        placeholder={{}}
        value={value}
        useNativeAndroidPickerStyle={false}
        items={SPELL_SCHOOLS.map((school) => ({
          label: i18n.t(`spells.schools.${school}`),
          value: school,
        }))}
      >
        <View className="rounded-lg bg-gray-100 px-4 h-15 py-2.5 flex flex-row justify-between items-center gap-2">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value ? i18n.t(`spells.schools.${value}`) : i18n.t('general.none')}
          </Text>

          <View className="pt-1">
            <ChevronDown size={12} />
          </View>
        </View>
      </RNPickerSelect>

      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </View>
  );
};
