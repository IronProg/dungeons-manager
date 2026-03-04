import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Tent } from 'lucide-react-native';
import i18n from 'i18n';

import { useGetAllClasses } from 'services/classes/class';

import { CharacterGeneralInfo } from 'types/character';

type HitDicesProps = {
  generalInfo: CharacterGeneralInfo;
  onLongPress: () => void;
};

export const HitDices = ({ onLongPress }: HitDicesProps) => {
  const { data: characterClasses } = useGetAllClasses();

  const { hitDicesMaximum, hitDiceAmount } = useMemo(
    () => ({
      hitDicesMaximum:
        characterClasses?.reduce((acc, item) => acc + item.level, 0) ?? 0,
      hitDiceAmount:
        characterClasses?.reduce((acc, item) => acc + item.hitDiceAmount, 0) ??
        0,
    }),
    [characterClasses],
  );

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      className="relative flex flex-col items-center justify-center w-[90px]"
    >
      <Tent size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />

      <View className="absolute flex flex-col items-center justify-center h-full w-full">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.hitDices')}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {hitDiceAmount}/{hitDicesMaximum}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
