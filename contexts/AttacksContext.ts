import { AttacksProviderProps } from 'providers/AttacksProvider';
import { createContext, useContext } from 'react';

export const AttacksContext = createContext<AttacksProviderProps | undefined>(
  undefined,
);

export const useAttacks = () => {
  const context = useContext(AttacksContext);

  if (!context) {
    throw new Error('useAttacks must be used within a AttacksProvider');
  }

  return context;
};
