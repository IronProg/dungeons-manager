import i18n from 'i18n';
import { Book } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character } from 'types/character';

type ExperienceProps = {
  character: Character;
  onLongPress: () => void;
};

export const Experience = ({ character, onLongPress }: ExperienceProps) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Book size={90} color={'#ccc'} fill={'#ddd'} />

      <View className="absolute flex flex-col items-center justify-center h-full w-full">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.experience')}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {character?.experience}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
