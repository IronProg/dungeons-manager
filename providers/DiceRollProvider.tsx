import { useRef, useCallback } from 'react';
import { DiceRollContext } from 'contexts/DiceRollContext';
import {
  DiceRollSheet,
  type DiceRollSheetHandle,
} from 'components/ui/DiceRollSheet';

export const DiceRollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sheetRef = useRef<DiceRollSheetHandle>(null);

  const roll = useCallback(
    (bonuses: number[], { diceSize }: { diceSize: number }) => {
      sheetRef.current?.roll(bonuses, { diceSize });
    },
    [],
  );

  return (
    <DiceRollContext.Provider value={{ roll }}>
      {children}

      <DiceRollSheet ref={sheetRef} />
    </DiceRollContext.Provider>
  );
};
