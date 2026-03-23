import { createContext, useContext } from 'react';

export type DiceRollContextType = {
  roll: (bonuses: number[], { diceSize }: { diceSize: number }) => void;
};

export const DiceRollContext = createContext<DiceRollContextType | null>(null);

export const useDiceRoll = () => {
  const ctx = useContext(DiceRollContext);
  if (!ctx) throw new Error('useDiceRoll must be used inside DiceRollProvider');
  return ctx;
};
