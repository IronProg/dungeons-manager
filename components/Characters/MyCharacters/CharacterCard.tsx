import { Trash2 } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

import { getAvatarColor, getClassColor } from '@/core/helpers/classColors';
import i18n from '@/i18n';
import type { Character } from '@/types/character';

interface CharacterCardProps {
  item: Character;
  onPress: () => void;
  onDelete: () => void;
}

export const CharacterCard = ({
  item,
  onPress,
  onDelete,
}: CharacterCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl p-4 mb-3 shadow-sm"
    activeOpacity={0.7}
  >
    <View className="flex-row items-center mb-3">
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: getAvatarColor(item) }}
      >
        <Text className="text-white font-bold text-lg">
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-base text-gray-800">
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm">
          {i18n.t('general.level')} {item.level}
        </Text>
      </View>

      <TouchableOpacity onPress={onDelete} className="p-2" hitSlop={10}>
        <Trash2 size={18} color={colors.red[500]} />
      </TouchableOpacity>
    </View>

    {item.characterClasses && item.characterClasses.length > 0 && (
      <View className="flex-row flex-wrap gap-2 mb-2">
        {item.characterClasses.map((cls) => (
          <View
            key={cls.id}
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: `${getClassColor(cls.name)}30` }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: getClassColor(cls.name) }}
            >
              {cls.name} {cls.level}
            </Text>
          </View>
        ))}
      </View>
    )}

    {item.table && (
      <Text className="text-gray-400 text-xs">{item.table.name}</Text>
    )}
  </TouchableOpacity>
);
