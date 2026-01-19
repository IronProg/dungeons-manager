import { AttributesProviderProps } from 'providers/AttributesProvider';
import { createContext, useContext } from 'react';

export const AttributesContext = createContext<
  AttributesProviderProps | undefined
>(undefined);

export const useAttributes = () => {
  const context = useContext(AttributesContext);

  if (!context) {
    throw new Error('useAttributes must be used within a AttributesProvider');
  }

  return context;
};
