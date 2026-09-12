import { ActivityIndicator, Text, View } from 'react-native';

import {
  SelectPicker,
  type SelectPickerItem,
} from '@/components/ui/inputs/SelectPicker';
import { useAttributes } from '@/contexts/AttributesContext';
import { useCharacter } from '@/contexts/CharacterContext';
import { ATTRIBUTES } from '@/core/enums/attributes';
import { getSpellCastingStats } from '@/core/helpers/spellCastingStats';
import i18n from '@/i18n';
import { useUpdateCharacterMutation } from '@/services/characters/character.api';

const ATTRIBUTE_OPTIONS: SelectPickerItem[] = ATTRIBUTES.map((attribute) => ({
  id: attribute,
  label: i18n.t(`attributes.${attribute}`),
}));

export const SpellCastingStats = () => {
  const { character, characterId, proficiencyBonus, isFetching } =
    useCharacter();
  const { modifiers } = useAttributes();
  const { mutate: updateCharacter } = useUpdateCharacterMutation();

  const spellModifier = character?.spellAttribute
    ? (modifiers?.[character.spellAttribute] ?? 0)
    : undefined;

  const stats = getSpellCastingStats({
    spellModifier: spellModifier ?? 0,
    proficiencyBonus,
  });

  if (!characterId || !character) return null;

  const handleAttributeChange = (value: string | number | null) => {
    if (
      typeof value !== 'string' ||
      !ATTRIBUTES.includes(value as AttributesType)
    ) {
      return;
    }

    const selectedAttribute = character?.characterAttributes.find(
      (attribute) => attribute.name === value,
    );

    if (!selectedAttribute) return;

    updateCharacter({ id: characterId, spellAttribute: value });
  };

  return (
    <View className="mt-3 gap-3 rounded-lg bg-white p-3">
      <View>
        <Text className="mb-1 text-sm font-medium text-gray-700">
          {i18n.t('spells.castingAttribute')}
        </Text>

        {isFetching ? (
          <ActivityIndicator className="my-3" />
        ) : (
          <SelectPicker
            value={character.spellAttribute}
            items={ATTRIBUTE_OPTIONS}
            onChange={handleAttributeChange}
          />
        )}
      </View>

      {character.spellAttribute && (
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-lg bg-slate-100 p-3">
            <Text className="text-xs text-gray-600">
              {i18n.t('spells.attackBonus')}
            </Text>
            <Text className="text-xl font-bold text-gray-900">
              {stats.attackBonus >= 0 ? '+' : ''}
              {stats.attackBonus}
            </Text>
          </View>

          <View className="flex-1 rounded-lg bg-slate-100 p-3">
            <Text className="text-xs text-gray-600">
              {i18n.t('spells.saveDc')}
            </Text>
            <Text className="text-xl font-bold text-gray-900">
              {stats.saveDc}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
