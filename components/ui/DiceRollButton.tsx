import type { ImageStyle } from 'expo-image';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';

import { useDiceRoll } from '@/contexts/DiceRollContext';
import { cn } from '@/core/helpers/cn';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const d20 = require('assets/icons/d20.svg');

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
      <Image source={d20} style={{ width: 20, height: 20, ...style }} />
    </TouchableOpacity>
  );
};
