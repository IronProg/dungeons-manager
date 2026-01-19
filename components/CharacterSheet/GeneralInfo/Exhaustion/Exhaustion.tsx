import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Skull } from 'lucide-react-native';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const Exhaustion = () => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();

  const handleChangeExhaustion = useCallback(() => {
    let newExhaustion = 0;
    if (generalInfo.exhaustion < 6) {
      newExhaustion = generalInfo.exhaustion += 1;
    }

    updateGeneralInfo({ ...generalInfo, exhaustion: newExhaustion });
  }, [generalInfo, updateGeneralInfo]);

  return (
    <TouchableOpacity
      onPress={handleChangeExhaustion}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      <Skull size={90} color={'#ccc'} fill={'#ddd'} />

      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          Exaustão
        </Text>
        <Text className="text-3xl font-bold text-center">
          {generalInfo.exhaustion}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
