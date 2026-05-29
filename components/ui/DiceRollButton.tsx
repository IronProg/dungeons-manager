import type { ImageStyle } from 'expo-image';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';

import d20 from '@/assets/icons/d20.svg';
import { useDiceRoll } from '@/contexts/DiceRollContext';
import { cn } from '@/core/helpers/cn';

export const DiceRollButton = ({
  bonuses = [],
  containerClassName = '',
  style = {},
}: {
  bonuses?: number[];
  containerClassName?: string;
  style?: ImageStyle;
}) => {
  const { simpleRoll } = useDiceRoll();

  const handleRoll = () => {
    simpleRoll(bonuses);
  };

  return (
    <TouchableOpacity
      onPress={handleRoll}
      hitSlop={10}
      className={cn('bg-indigo-200 p-2 rounded-full', containerClassName)}
    >
      <Image source={d20} className="w-5 h-5" style={style} />
    </TouchableOpacity>
  );
};
