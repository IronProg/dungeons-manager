import { useAttributes } from 'contexts/AttributesContext';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Zap } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

type InitiativeProps = {
  onLongPress: () => void;
};

export const Initiative = ({ onLongPress }: InitiativeProps) => {
  const { modifiers } = useAttributes();
  const { generalInfo } = useGeneralInfo();

  let modifier = modifiers['dexterity'];

  if (generalInfo.initiativeCustomBonus) {
    modifier += generalInfo.initiativeCustomBonus;
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Zap size={90} color={'#ccc'} fill={'#ddd'} />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          Iniciativa
        </Text>
        <Text className="text-3xl font-bold text-center">{modifier}</Text>
      </View>
    </TouchableOpacity>
  );
};
