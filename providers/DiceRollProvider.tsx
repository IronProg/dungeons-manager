import { useRef, useState } from 'react';

import {
  ComposeRollSheet,
  type ComposeRollSheetHandle,
} from '@/components/ui/ComposeRollSheet';
import {
  DiceRollSheet,
  type DiceRollSheetHandle,
} from '@/components/ui/DiceRollSheet';
import type { ComposeRollParams } from '@/contexts/DiceRollContext';
import { DiceRollContext } from '@/contexts/DiceRollContext';

export const DiceRollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sheetRef = useRef<DiceRollSheetHandle>(null);
  const composeSheetRef = useRef<ComposeRollSheetHandle>(null);

  const [enabled, setEnabled] = useState(true);

  const simpleRoll = (bonuses: number[]) => {
    if (!enabled) return;

    sheetRef.current?.roll(bonuses, { diceSize: 20 });
  };

  const composeRoll = (params: ComposeRollParams) => {
    if (!enabled) return;

    composeSheetRef.current?.roll(params);
  };

  return (
    <DiceRollContext.Provider
      value={{ simpleRoll, composeRoll, enabled, setEnabled }}
    >
      {children}

      <DiceRollSheet ref={sheetRef} />
      <ComposeRollSheet ref={composeSheetRef} />
    </DiceRollContext.Provider>
  );
};
