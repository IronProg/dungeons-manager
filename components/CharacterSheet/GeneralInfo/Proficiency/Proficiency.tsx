import i18n from 'i18n';
import { Award } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character } from 'types/character';

type ProficiencyProps = {
  character: Character;
  onLongPress: () => void;
};

export const Proficiency = ({ character, onLongPress }: ProficiencyProps) => {
  const { proficiency } = character;

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Award size={90} color={'#ccc'} fill={'#ddd'} />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('general.proficiency')}
        </Text>
        <Text className="text-3xl font-bold text-center">{proficiency}</Text>
      </View>
    </TouchableOpacity>
  );
};
