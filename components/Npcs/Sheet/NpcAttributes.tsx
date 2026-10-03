import { Text, TouchableOpacity, View } from 'react-native';

import i18n from '@/i18n';
import type { Npc, NpcAbilityName } from '@/types/npc';

type NpcAttributesProps = {
  npc: Npc;
  onLongPress: () => void;
};

const abilityNames: NpcAbilityName[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const NpcAttributes = ({ npc, onLongPress }: NpcAttributesProps) => (
  <TouchableOpacity onLongPress={onLongPress} className="p-3">
    <View className="flex-row flex-wrap">
      {abilityNames.map((abilityName) => {
        const score = npc[abilityName];
        const modifier = Math.floor((score - 10) / 2);
        const modifierText =
          modifier >= 0 ? `+${modifier}` : modifier.toString();

        return (
          <View key={abilityName} className="w-1/3 p-1.5">
            <View className="border border-slate-200 rounded-xl items-center py-3">
              <Text className="text-gray-500 text-xs font-semibold">
                {i18n.t(`attributes.${abilityName}`)}
              </Text>
              <Text className="text-gray-900 text-2xl font-bold mt-1">
                {score}
              </Text>
              <Text className="text-indigo-600 text-sm font-semibold">
                {modifierText}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  </TouchableOpacity>
);
