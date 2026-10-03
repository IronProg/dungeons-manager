import { Shield } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import i18n from '@/i18n';
import type { Npc } from '@/types/npc';

type NpcGeneralInfoProps = {
  npc: Npc;
  onLongPress: () => void;
};

export const NpcGeneralInfo = ({ npc, onLongPress }: NpcGeneralInfoProps) => (
  <TouchableOpacity onLongPress={onLongPress} className="px-4 py-5">
    <View className="flex-row items-center gap-3">
      <View className="bg-slate-100 rounded-full h-14 w-14 items-center justify-center">
        <Shield size={30} color="#4f46e5" />
      </View>
      <View>
        <Text className="text-gray-500 text-sm font-medium">
          {i18n.t('titles.armorClass')}
        </Text>
        <Text className="text-gray-900 text-3xl font-bold">
          {npc.armorClass}
        </Text>
      </View>
      <View className="bg-slate-100 rounded-xl px-4 py-2 items-center">
        <Text className="text-gray-500 text-xs font-medium">
          {i18n.t('general.proficiency')}
        </Text>
        <Text className="text-gray-900 text-2xl font-bold">
          +{npc.proficiencyBonus}
        </Text>
      </View>
    </View>

    <View className="mt-5 gap-3">
      <GeneralValue label={i18n.t('titles.speed')} value={npc.speeds} />
      <GeneralValue label={i18n.t('npcs.skills')} value={npc.skills} />
      <GeneralValue label={i18n.t('npcs.senses')} value={npc.senses} />
      <GeneralValue
        label={i18n.t('proficiency.languages')}
        value={npc.languages}
      />
    </View>
  </TouchableOpacity>
);

const GeneralValue = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <View className="border-b border-slate-100 pb-3">
    <Text className="text-gray-500 text-sm font-medium">{label}</Text>
    <Text className="text-gray-900 text-base mt-1">
      {value?.trim() ? value : i18n.t('general.none')}
    </Text>
  </View>
);
