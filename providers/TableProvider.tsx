import { ReactNode, useCallback, useEffect, useState } from 'react';

import { TableContext } from 'contexts/TableContext';
import { queryClient } from 'core/queryClient/queryClient';
import { useGetTable } from 'services/tables/table.api';
import { Table } from 'types/table';
import { useGetCurrentUser } from 'services/auth/auth.api';

export type TableProviderProps = {
  tableId?: number;
  table?: Table;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  setTableId: (id: number) => void;
  clearTableId: () => void;
};

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const { data: currentUser } = useGetCurrentUser();
  const [tableId, setTableIdState] = useState<number>();

  const {
    data: table,
    isPending,
    isFetching,
    isError,
  } = useGetTable({ id: tableId });

  console.log({ tableId, table, isError });

  const setTableId = useCallback((id: number) => {
    setTableIdState(id);
  }, []);

  const clearTableId = useCallback(() => {
    setTableIdState(undefined);
  }, []);

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ['characters'] });
  }, [tableId]);

  useEffect(() => {
    if (!currentUser) {
      clearTableId();
    }
  }, [clearTableId, currentUser]);

  const value: TableProviderProps = {
    tableId,
    table,
    isPending,
    isFetching,
    isError,
    setTableId,
    clearTableId,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
