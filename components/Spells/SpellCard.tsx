import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Image } from 'expo-image';
import {
  ChevronDown,
  ChevronUp,
  Crosshair,
  Edit,
  WandSparkles,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import i18n from 'i18n';

import { colors } from 'core/utils/colors';
import { useSpellDamage } from 'hooks/useSpellDamage';
import { useUpdateSpellMutation } from 'services/spells/spell.api';
import { useCharacter } from 'contexts/CharacterContext';
import { useDiceRoll } from 'contexts/DiceRollContext';

import { Spell } from 'types/character';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const headIcon = require('assets/icons/head.svg') as string;

type SpellCardProps = {
  spell: Spell;
  onCast: () => void;
  canEdit: boolean;
};

export const SpellCard = ({ spell, onCast, canEdit }: SpellCardProps) => {
  const router = useRouter();
  const { calculateCantripDamage } = useSpellDamage();
  const { simpleRoll, composeRoll } = useDiceRoll();
  const { characterId, modifiers, proficiencyBonus } = useCharacter();
  const { mutate: updateSpell } = useUpdateSpellMutation();

  const handleAttack = () => {
    if (!spell.attack) return;

    const attack = spell.attack;

    const bonuses = [];

    if (attack.customBonus) bonuses.push(attack.customBonus);
    if (attack.mainAttribute) bonuses.push(modifiers![attack.mainAttribute]);
    if (attack.applyProficiency) bonuses.push(proficiencyBonus);

    simpleRoll(bonuses);
  };

  const handleEdit = () => {
    router.push({
      pathname: '/spell-form',
      params: { id: spell.id, level: spell.level },
    });
  };

  const togglePrepared = () => {
    updateSpell({
      characterId: characterId!,
      id: spell.id!,
      prepared: !spell.prepared,
    });
  };

  const componentsString = useMemo(() => {
    const comps = [];
    if (spell.verbal) comps.push('V');
    if (spell.somatic) comps.push('S');
    if (spell.material) comps.push('M');

    let str = comps.join(', ');
    if (spell.components) {
      str += ` (${spell.components})`;
    }
    return str;
  }, [spell.components, spell.material, spell.somatic, spell.verbal]);

  const handleCast = () => {
    if (spell.level !== 0) {
      return onCast();
    }

    const dices = calculateCantripDamage({ spell });

    composeRoll(dices);
  };

  return (
    <View className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
      <View className="flex flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <View className="flex flex-row items-start gap-1">
            <View className="flex-1 flex-col gap-2">
              <Text className="text-xl font-bold flex-1">{spell.name}</Text>

              <View className="flex flex-row items-center gap-1">
                <Text className="text-sm italic text-gray-500">
                  {i18n.t(`spells.schools.${spell.school}`)}
                </Text>

                {spell.concentration && (
                  <Image source={headIcon} style={{ width: 20, height: 20 }} />
                )}

                {spell.ritual && (
                  <Text className="text-xs font-bold">
                    {i18n.t('spells.ritual')}
                  </Text>
                )}
              </View>
            </View>

            {!!spell.attack && (
              <TouchableOpacity
                disabled={!spell.attack}
                onPress={handleAttack}
                className="pt-1 px-2 pb-2"
                hitSlop={10}
              >
                <Crosshair size={20} color={colors.purple['600']} />
              </TouchableOpacity>
            )}

            {(spell.damages?.length > 0 ||
              spell.higherLevelsDamages?.length > 0) && (
              <TouchableOpacity
                onPress={handleCast}
                className="pt-1 px-2 pb-2"
                hitSlop={10}
              >
                <WandSparkles size={20} color={colors.purple['600']} />
              </TouchableOpacity>
            )}

            {canEdit && (
              <TouchableOpacity onPress={handleEdit} className="pt-1 px-2 pb-2">
                <Edit size={20} color={colors.indigo['600']} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {spell.level > 0 && (
          <View className="flex flex-col items-center ml-2">
            <Switch
              value={spell.prepared}
              onValueChange={togglePrepared}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={'#ffffff'}
              disabled={!canEdit}
            />

            <Text className="text-xs text-gray-500 mb-1">
              {i18n.t('spells.prepared')}
            </Text>
          </View>
        )}
      </View>

      <View className="flex flex-row flex-wrap gap-y-1 gap-x-3 mb-2">
        <View>
          <Text className="text-xs font-bold">
            {i18n.t('spells.castingTime')}:
          </Text>
          <Text className="text-sm">{spell.castingTime}</Text>
        </View>
        <View>
          <Text className="text-xs font-bold">{i18n.t('spells.range')}:</Text>
          <Text className="text-sm">{spell.range}</Text>
        </View>
        <View>
          <Text className="text-xs font-bold">
            {i18n.t('spells.duration')}:
          </Text>
          <Text className="text-sm">{spell.duration}</Text>
        </View>
        <View>
          <Text className="text-xs font-bold">
            {i18n.t('spells.components')}:
          </Text>
          <Text className="text-sm">{componentsString}</Text>
        </View>
        {spell.innateTotal > 0 && (
          <View>
            <Text className="text-xs font-bold">
              {i18n.t('spells.innateTotal')}:
            </Text>
            <Text className="text-sm">{spell.innateTotal}</Text>
          </View>
        )}
      </View>

      {spell.description && <SpellDescription spell={spell} />}
    </View>
  );
};

const SpellDescription = ({ spell }: { spell: Spell }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mt-2">
      {expanded ? (
        <View>
          <Text className="text-sm text-gray-800">{spell.description}</Text>
          {spell.higherLevelDescription && (
            <View className="mt-2">
              <Text className="text-xs font-bold">
                {i18n.t('spells.higherLevelDescription')}:
              </Text>
              <Text className="text-sm text-gray-800">
                {spell.higherLevelDescription}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            className="mt-2 flex-row justify-center"
          >
            <ChevronUp size={20} color="gray" />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text className="text-sm text-gray-800" numberOfLines={2}>
            {spell.description}
          </Text>
          <TouchableOpacity
            onPress={() => setExpanded(true)}
            className="mt-1 flex-row justify-center"
          >
            <ChevronDown size={20} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
