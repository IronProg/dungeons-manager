import { TableProviderProps } from 'providers/TableProvider';
import { createContext, useContext } from 'react';

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
