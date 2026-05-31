import { TouchableOpacity } from 'react-native';

import D20 from '@/assets/icons/d20.svg';
import { useDiceRoll } from '@/contexts/DiceRollContext';
import { cn } from '@/core/helpers/cn';

export const DiceRollButton = ({
  bonuses = [],
  containerClassName = '',
  className = '',
}: {
  bonuses?: number[];
  containerClassName?: string;
  className?: string;
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
      <D20 width={20} height={20} className={(cn('w-5 h-5'), className)} />
    </TouchableOpacity>
  );
};
