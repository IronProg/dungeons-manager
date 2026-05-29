import { createContext, useContext } from 'react';

import type { TableProviderProps } from '@/providers/TableProvider';

export const TableContext = createContext<TableProviderProps | undefined>(
  undefined,
);

export const useTable = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }

  return context;
};
