import { Skull } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import i18n from '@/i18n';
import type { NpcSummary } from '@/types/npc';

type NpcCardProps = {
  item: NpcSummary;
  onPress: () => void;
};

export const NpcCard = ({ item, onPress }: NpcCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl p-4 mb-3 shadow-sm"
    activeOpacity={0.7}
  >
    <View className="flex-row items-center">
      <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center mr-3">
        <Skull size={24} color="#4f46e5" />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-base text-gray-800">
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm">
          {i18n.t('titles.hp')}: {item.hitPoints}
        </Text>
      </View>

      <View className="bg-indigo-50 rounded-full px-3 py-1">
        <Text className="text-indigo-600 text-xs font-semibold">
          {i18n.t('npcs.challengeRating', { rating: item.challengeRating })}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
