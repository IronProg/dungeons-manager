import { createContext, useContext } from 'react';

import type { CharacterProviderProps } from '@/providers/CharacterProvider';

export const CharacterContext = createContext<
  CharacterProviderProps | undefined
>(undefined);

export const useCharacter = () => {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }

  return context;
};
