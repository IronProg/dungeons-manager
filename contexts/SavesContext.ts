import { SavesProviderProps } from 'providers/SavesProvider';
import { createContext, useContext } from 'react';

export const SavesContext = createContext<SavesProviderProps | undefined>(
  undefined,
);

export const useSaves = () => {
  const context = useContext(SavesContext);

  if (!context) {
    throw new Error('useSaves must be used within a SavesProvider');
  }

  return context;
};
