import { useEffect, useRef } from 'react';

import { ComposeRollSheet } from '@/components/ui/ComposeRollSheet';
import type { ComposeRollSheetHandle } from '@/components/ui/ComposeRollSheet';
import { DiceRollSheet } from '@/components/ui/DiceRollSheet';
import type { DiceRollSheetHandle } from '@/components/ui/DiceRollSheet';
import { useDiceRollStore } from '@/core/stores/diceRollStore';

export const DiceRollHost = () => {
  const simpleRollRef = useRef<DiceRollSheetHandle>(null);
  const composeRollRef = useRef<ComposeRollSheetHandle>(null);

  useEffect(() => {
    useDiceRollStore.getState().registerHost({
      simpleRoll: (bonuses, options) =>
        simpleRollRef.current?.roll(bonuses, options),
      composeRoll: (params) => composeRollRef.current?.roll(params),
    });

    return () => {
      useDiceRollStore.getState().unregisterHost();
    };
  }, []);

  return (
    <>
      <DiceRollSheet ref={simpleRollRef} />
      <ComposeRollSheet ref={composeRollRef} />
    </>
  );
};
