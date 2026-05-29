import { createContext, useContext } from 'react';

import type { AttributesProviderProps } from '@/providers/AttributesProvider';

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
