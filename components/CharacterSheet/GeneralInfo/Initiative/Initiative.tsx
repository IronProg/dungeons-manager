import { useCharacter } from 'contexts/CharacterContext';
import i18n from 'i18n';
import { Zap } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { CharacterGeneralInfo } from 'types/character';

type InitiativeProps = {
  generalInfo: CharacterGeneralInfo;
  onLongPress: () => void;
};

export const Initiative = ({ generalInfo, onLongPress }: InitiativeProps) => {
  const { modifiers } = useCharacter();

  let modifier = modifiers?.['dexterity'] || 0;

  if (generalInfo.initiativeCustomBonus) {
    modifier += generalInfo.initiativeCustomBonus;
  }

  if (generalInfo.initiativeExtraAttribute) {
    modifier += modifiers?.[generalInfo.initiativeExtraAttribute] || 0;
  }

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center w-[90px]"
    >
      <Zap size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.initiative')}
        </Text>
        <Text className="text-3xl font-bold text-center">{modifier}</Text>
      </View>
    </TouchableOpacity>
  );
};
