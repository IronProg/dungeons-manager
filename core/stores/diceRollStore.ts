import { create } from 'zustand';

import { useSettingsStore } from '@/core/stores/settingsStore';
import type { ComposeRollParams } from '@/types/diceRoll';

export type DiceRollHostActions = {
  simpleRoll: (bonuses: number[], options: { diceSize: number }) => void;
  composeRoll: (params: ComposeRollParams) => void;
};

type DiceRollState = {
  hostActions: DiceRollHostActions | null;
  registerHost: (host: DiceRollHostActions) => void;
  unregisterHost: () => void;
  simpleRoll: (bonuses: number[], options: { diceSize: number }) => void;
  composeRoll: (params: ComposeRollParams) => void;
};

export const useDiceRollStore = create<DiceRollState>((set, get) => ({
  hostActions: null,
  registerHost: (hostActions) => set({ hostActions }),
  unregisterHost: () => set({ hostActions: null }),
  simpleRoll: (bonuses, options) => {
    if (!useSettingsStore.getState().diceRollingEnabled) return;
    get().hostActions?.simpleRoll(bonuses, options);
  },
  composeRoll: (params) => {
    if (!useSettingsStore.getState().diceRollingEnabled) return;
    get().hostActions?.composeRoll(params);
  },
}));
