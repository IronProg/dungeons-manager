import { Award } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';

export const Proficiency = () => {
  const { proficiencyBonus } = useCharacter();

  return (
    <View className="relative flex flex-col items-center justify-center w-[90px]">
      <Award size={90} color="#cbd5e1" fill="#e2e8f0" />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('general.proficiency')}
        </Text>
        <Text className="text-3xl font-bold text-center">
          {proficiencyBonus}
        </Text>
      </View>
    </View>
  );
};
