import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Bird, Footprints, Mountain } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type SpeedHighlight = {
  type: 'normal' | 'climbing' | 'flying';
  speed: number;
};

type SpeedProps = {
  onLongPress: () => void;
};

export const Speed = ({ onLongPress }: SpeedProps) => {
  const { generalInfo } = useGeneralInfo();

  const [activeSpeeds, setActiveSpeeds] = useState<SpeedHighlight[]>([]);
  const [speedIndex, setSpeedIndex] = useState<number>(0);

  useEffect(() => {
    const speeds: SpeedHighlight[] = [
      { type: 'normal', speed: generalInfo.speed },
    ];

    if (generalInfo.speedClimbing) {
      speeds.push({ type: 'climbing', speed: generalInfo.speedClimbing });
    }

    if (generalInfo.speedFlying) {
      speeds.push({ type: 'flying', speed: generalInfo.speedFlying });
    }

    setActiveSpeeds(speeds);
  }, [generalInfo.speed, generalInfo.speedClimbing, generalInfo.speedFlying]);

  const handleChangeSpeedType = useCallback(() => {
    if (activeSpeeds.length === 0 && speedIndex < activeSpeeds.length - 1) {
      setSpeedIndex((prev) => prev + 1);
    } else {
      setSpeedIndex(0);
    }
  }, [activeSpeeds.length, speedIndex]);

  const activeSpeed = activeSpeeds[speedIndex];

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={handleChangeSpeedType}
      className="relative flex flex-col items-center justify-center flex w-[90px]"
    >
      {activeSpeed?.type === 'normal' && (
        <Footprints size={90} color={'#ccc'} fill={'#ddd'} />
      )}

      {activeSpeed?.type === 'climbing' && (
        <Mountain size={90} color={'#ccc'} fill={'#ddd'} />
      )}

      {activeSpeed?.type === 'flying' && (
        <Bird size={90} color={'#ccc'} fill={'#ddd'} />
      )}
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          Velocidade
        </Text>
        <Text className="text-3xl font-bold text-center">
          {activeSpeed?.speed}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
