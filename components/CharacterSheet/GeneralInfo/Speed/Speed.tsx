import i18n from 'i18n';
import { Bird, Footprints, Mountain } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CharacterGeneralInfo } from 'types/character';

export type SpeedHighlight = {
  type: 'normal' | 'climbing' | 'flying';
  speed?: number;
};

type SpeedProps = {
  generalInfo: CharacterGeneralInfo;
  onLongPress: () => void;
};

export const Speed = ({ generalInfo, onLongPress }: SpeedProps) => {
  const [activeSpeeds, setActiveSpeeds] = useState<SpeedHighlight[]>([]);
  const [speedIndex, setSpeedIndex] = useState<number>(0);

  useEffect(() => {
    const speeds: SpeedHighlight[] = [
      { type: 'normal', speed: generalInfo?.speed },
    ];

    if (generalInfo?.speedClimbing) {
      speeds.push({ type: 'climbing', speed: generalInfo?.speedClimbing });
    }

    if (generalInfo?.speedFlying) {
      speeds.push({ type: 'flying', speed: generalInfo?.speedFlying });
    }

    setActiveSpeeds(speeds);
  }, [
    generalInfo?.speed,
    generalInfo?.speedClimbing,
    generalInfo?.speedFlying,
  ]);

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
      className="relative flex flex-col items-center justify-center w-[90px]"
    >
      {activeSpeed?.type === 'normal' && (
        <Footprints size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />
      )}

      {activeSpeed?.type === 'climbing' && (
        <Mountain size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />
      )}

      {activeSpeed?.type === 'flying' && (
        <Bird size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />
      )}
      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.speed')}
        </Text>
        <Text className="text-3xl font-bold text-center">
          {activeSpeed?.speed}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
