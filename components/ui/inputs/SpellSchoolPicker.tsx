import { Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { SPELL_SCHOOLS } from '@/core/enums/spellSchool';
import i18n from '@/i18n';
import type { SpellSchoolType } from '@/types/character';

const SPELL_SCHOOLS_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...SPELL_SCHOOLS.map((school) => ({
    id: school,
    label: i18n.t(`spells.schools.${school}`),
  })),
];

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
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg w-full">
        <SelectPicker
          value={value}
          items={SPELL_SCHOOLS_OPTIONS}
          error={error}
          onChange={(newValue) => {
            onChange(newValue as SpellSchoolType);
          }}
          placeholder={i18n.t('placeholders.spellSchool')}
        />
      </View>

      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </>
  );
};
