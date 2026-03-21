import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Image } from 'expo-image';
import { ChevronDown, ChevronUp, Edit } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import i18n from 'i18n';

import { useUpdateSpellMutation } from 'services/spells/spell.api';

import { Spell } from 'types/character';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const headIcon = require('assets/icons/head.svg') as string;

type SpellCardProps = {
  spell: Spell;
};

export const SpellCard = ({ spell }: SpellCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { mutate: updateSpell } = useUpdateSpellMutation();
  const router = useRouter();

  const handleEdit = () => {
    router.push({
      pathname: '/spell-form',
      params: { id: spell.id, level: spell.level },
    });
  };

  const togglePrepared = () => {
    updateSpell({ id: spell.id, prepared: !spell.prepared });
  };

  const getComponentsString = () => {
    const comps = [];
    if (spell.verbal) comps.push('V');
    if (spell.somatic) comps.push('S');
    if (spell.material) comps.push('M');

    let str = comps.join(', ');
    if (spell.components) {
      str += ` (${spell.components})`;
    }
    return str;
  };

  return (
    <View className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
      <View className="flex flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <View className="flex flex-row items-start gap-1">
            <Text className="text-xl font-bold flex-1">{spell.name}</Text>

            <TouchableOpacity onPress={handleEdit} className="p-1">
              <Edit size={16} color="#4f46e5" />
            </TouchableOpacity>

            {spell.concentration && (
              <Image source={headIcon} style={{ width: 20, height: 20 }} />
            )}
          </View>
          <Text className="text-sm italic text-gray-500">{spell.school}</Text>
        </View>

        {spell.level > 0 && (
          <View className="flex flex-col items-center ml-2">
            <Text className="text-xs text-gray-500 mb-1">
              {i18n.t('spells.prepared')}
            </Text>
            <Switch
              value={spell.prepared}
              onValueChange={togglePrepared}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={'#ffffff'}
            />
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
          <Text className="text-sm">{getComponentsString()}</Text>
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

      {spell.description && (
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
      )}
    </View>
  );
};
