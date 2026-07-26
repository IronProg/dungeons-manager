import { useDiceRollStore } from '@/core/stores/diceRollStore';
import { useSettingsStore } from '@/core/stores/settingsStore';

export const useDiceRoll = () => {
  const enabled = useSettingsStore((state) => state.diceRollingEnabled);
  const setDiceRollingEnabled = useSettingsStore(
    (state) => state.setDiceRollingEnabled,
  );
  const storeSimpleRoll = useDiceRollStore((state) => state.simpleRoll);
  const composeRoll = useDiceRollStore((state) => state.composeRoll);

  const setEnabled = (value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === 'function' ? value(enabled) : value;
    setDiceRollingEnabled(next);
  };

  const simpleRoll = (
    bonuses: number[],
    options: { diceSize: number } = { diceSize: 20 },
  ) => {
    storeSimpleRoll(bonuses, options);
  };

  return { enabled, setEnabled, simpleRoll, composeRoll };
};
