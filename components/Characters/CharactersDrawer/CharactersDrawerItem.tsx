import { Text, TouchableOpacity, View } from 'react-native';
import { Eye, Trash2 } from 'lucide-react-native';
import i18n from 'i18n';

import { useTable } from 'contexts/TableContext';
import colors from 'tailwindcss/colors';

import type { Character } from 'types/character';

interface CharactersDrawerItemProps {
  item: Character;
  onPress: () => void;
  onDelete: () => void;
}

export const CharactersDrawerItem = ({
  item,
  onPress,
  onDelete,
}: CharactersDrawerItemProps) => {
  const { table } = useTable();

  const isViewOnly = table?.isCreator && !item.isOwner;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm"
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 rounded-full bg-indigo-500 items-center justify-center mr-3">
        <Text className="text-white font-bold text-lg">
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-1">
          {isViewOnly && <Eye size={14} color={colors.indigo[500]} />}

          <Text className="font-semibold text-base text-gray-800">
            {item.name}
          </Text>
        </View>
        <Text className="text-gray-400 text-sm">
          {i18n.t('general.level')} {item.level}
        </Text>
        {item.table && (
          <View className="flex flex-row gap-1 items-center">
            <Text className="font-bold text-gray-600 text-sm">
              {i18n.t('tables.table')}:
            </Text>
            <Text className="text-gray-400 text-sm">{item.table.name}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={onDelete} className="p-2" hitSlop={10}>
        <Trash2 size={18} color={colors.red[500]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
