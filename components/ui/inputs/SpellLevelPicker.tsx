import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ChevronDown } from 'lucide-react-native';
import i18n from 'i18n';

import { SPELL_SLOT_LEVELS } from 'core/enums/spellSlotLevel';

import { SpellSlotLevelType } from 'types/character';

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
      <RNPickerSelect
        onValueChange={onChange}
        placeholder={{}}
        value={value}
        useNativeAndroidPickerStyle={false}
        items={SPELL_SLOT_LEVELS.map((lvl) => ({
          label: lvl === 0 ? i18n.t('spells.cantrip') : `${lvl}`,
          value: lvl,
        }))}
      >
        <View className="rounded-lg bg-gray-100 px-4 h-15 py-2.5 flex flex-row justify-between items-center gap-2">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {value === 0 ? i18n.t('spells.cantrip') : value}
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
