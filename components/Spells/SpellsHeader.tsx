import { useRouter } from 'expo-router';
import { FilePlus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import i18n from '@/i18n';
import type { SpellSlotLevelType } from '@/types/character';

interface SpellsHeaderProps {
  level: SpellSlotLevelType;
  canEdit: boolean;
}

export const SpellsHeader = ({ level, canEdit }: SpellsHeaderProps) => {
  const router = useRouter();

  const handleCreateSpell = () => {
    router.push({
      pathname: '/spell-form',
      params: { level },
    });
  };

  return (
    <View className="px-4 py-3 flex flex-row items-center justify-between z-10">
      <Text className="text-lg font-bold">
        {level === 0
          ? i18n.t('spellSlots.cantrips')
          : `${i18n.t('spellSlots.level')} ${level}`}
      </Text>

      {canEdit && (
        <TouchableOpacity
          hitSlop={10}
          onPress={handleCreateSpell}
          className="bg-indigo-600 w-8 h-8 rounded-full items-center justify-center"
        >
          <FilePlus size={18} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
