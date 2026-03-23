import { TouchableOpacity } from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { useDiceRoll } from 'contexts/DiceRollContext';
import { useCallback } from 'react';
import { cn } from 'core/helpers/cn';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const d20 = require('assets/icons/d20.svg');

export const DiceRollButton = ({
  bonuses = [],
  diceSize = 20,
  containerClassName = '',
  style = {},
}: {
  bonuses?: number[];
  diceSize?: number;
  containerClassName?: string;
  style?: ImageStyle;
}) => {
  const { roll } = useDiceRoll();

  const handleRoll = useCallback(() => {
    roll(bonuses, { diceSize });
  }, [bonuses, roll, diceSize]);

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
