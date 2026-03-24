import { useRef, useCallback, useState } from 'react';

import {
  DiceRollSheet,
  type DiceRollSheetHandle,
} from 'components/ui/DiceRollSheet';
import {
  ComposeRollSheet,
  type ComposeRollSheetHandle,
} from 'components/ui/ComposeRollSheet';
import { DiceRollContext, ComposeRollParams } from 'contexts/DiceRollContext';

export const DiceRollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sheetRef = useRef<DiceRollSheetHandle>(null);
  const composeSheetRef = useRef<ComposeRollSheetHandle>(null);

  const [enabled, setEnabled] = useState(true);

  const simpleRoll = useCallback(
    (bonuses: number[]) => {
      if (!enabled) return;

      sheetRef.current?.roll(bonuses, { diceSize: 20 });
    },
    [enabled],
  );

  const composeRoll = useCallback(
    (params: ComposeRollParams) => {
      if (!enabled) return;

      composeSheetRef.current?.roll(params);
    },
    [enabled],
  );

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
