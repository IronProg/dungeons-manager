import { CharactersProviderProps } from 'providers/CharactersProvider';
import { createContext, useContext } from 'react';

export const CharactersContext = createContext<
  CharactersProviderProps | undefined
>(undefined);

export const useCharacters = () => {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error('useCharacters must be used within a CharactersProvider');
  }

  return context;
};
