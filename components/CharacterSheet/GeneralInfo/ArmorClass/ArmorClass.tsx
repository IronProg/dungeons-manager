import { useAttributes } from 'contexts/AttributesContext';
import i18n from 'i18n';
import { Shield } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { CharacterGeneralInfo } from 'types/character';

type ArmorClassProps = {
  generalInfo: CharacterGeneralInfo;
  onLongPress: () => void;
};

export const ArmorClass = ({ generalInfo, onLongPress }: ArmorClassProps) => {
  const { modifiers } = useAttributes();

  let modifier = generalInfo.armorClassBase;

  if (generalInfo.armorClassFirstAttribute) {
    modifier += modifiers[generalInfo.armorClassFirstAttribute];
  }

  if (generalInfo.armorClassSecondAttribute) {
    modifier += modifiers[generalInfo.armorClassSecondAttribute];
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Shield size={90} color={'#ccc'} fill={'#ddd'} />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.ac')}
        </Text>
        <Text className="text-3xl font-bold text-center">{modifier}</Text>
      </View>
    </TouchableOpacity>
  );
};
