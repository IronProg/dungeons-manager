import { createContext, useContext } from 'react';

export type ComposeRollParams = {
  label?: string;
  amount: number;
  diceSize: number;
  bonuses: number[];
}[];

export type DiceRollContextType = {
  simpleRoll: (bonuses: number[]) => void;
  composeRoll: (params: ComposeRollParams) => void;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DiceRollContext = createContext<DiceRollContextType | null>(null);

export const useDiceRoll = () => {
  const ctx = useContext(DiceRollContext);
  if (!ctx) throw new Error('useDiceRoll must be used inside DiceRollProvider');
  return ctx;
};
