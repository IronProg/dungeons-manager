import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { useSkills } from 'contexts/SkillsContext';
import i18n from 'i18n';
import { Eye } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

type PassivePerceptionProps = {
  onLongPress: () => void;
};

export const PassivePerception = ({ onLongPress }: PassivePerceptionProps) => {
  const { getSkillBonus } = useSkills();
  const { generalInfo } = useGeneralInfo();

  const passivePercetion =
    10 +
    getSkillBonus('perception') +
    (generalInfo.passivePerceptionCustomBonus || 0);

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Eye size={90} color={'#ccc'} fill={'#ddd'} />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.passivePerception')}
        </Text>
        <Text className="text-3xl font-bold text-center">
          {passivePercetion}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
