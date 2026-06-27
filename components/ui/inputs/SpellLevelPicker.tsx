import { Text, View } from 'react-native';

import type { SelectPickerItem } from '@/components/ui/inputs/SelectPicker';
import { SelectPicker } from '@/components/ui/inputs/SelectPicker';
import { SPELL_SLOT_LEVELS } from '@/core/enums/spellSlotLevel';
import i18n from '@/i18n';
import type { SpellSlotLevelType } from '@/types/character';

const SPELL_SLOT_LEVELS_OPTIONS: SelectPickerItem[] = [
  { id: null, label: i18n.t('general.none') },
  ...SPELL_SLOT_LEVELS.map((lvl) => ({
    id: lvl,
    label: lvl === 0 ? i18n.t('spells.cantrip') : `${lvl}`,
  })),
];

type SpellLevelPickerProps = {
  value?: SpellSlotLevelType;
  onChange?: (newValue: SpellSlotLevelType) => void;
  error?: string;
};

export const SpellLevelPicker = ({
  value,
  onChange = () => {},
  error,
}: SpellLevelPickerProps) => {
  return (
    <>
      <View className="flex items-center justify-center bg-gray-100 rounded-lg w-full">
        <SelectPicker
          value={value}
          items={SPELL_SLOT_LEVELS_OPTIONS}
          error={error}
          onChange={(newValue) => {
            onChange(newValue as SpellSlotLevelType);
          }}
          placeholder={i18n.t('placeholders.level')}
        />
      </View>

      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </>
  );
};
