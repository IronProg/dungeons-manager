import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Tent } from 'lucide-react-native';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type HitDicesProps = {
  onLongPress: () => void;
};

export const HitDices = ({ onLongPress }: HitDicesProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();

  const handleReduceHitDices = useCallback(() => {
    let newHitDices = 0;
    if (generalInfo.hitDices > 0) {
      newHitDices = generalInfo.hitDices - 1;
    }

    updateGeneralInfo({ ...generalInfo, hitDices: newHitDices });
  }, [generalInfo, updateGeneralInfo]);

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={handleReduceHitDices}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Tent size={90} color={'#ccc'} fill={'#ddd'} />

      <View className="absolute flex flex-col items-center justify-center h-full w-full">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          Dados de vida ({generalInfo.hitDicesSize})
        </Text>
        <Text className="text-2xl font-bold text-center">
          {generalInfo.hitDices}/{generalInfo.hitDicesMaximum}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
