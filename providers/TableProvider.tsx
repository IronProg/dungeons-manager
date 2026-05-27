import { ReactNode, useCallback, useEffect, useState } from 'react';

import { TableContext } from 'contexts/TableContext';
import { queryClient } from 'core/queryClient/queryClient';
import { useGetTable } from 'services/tables/table.api';
import { Table } from 'types/table';
import { useGetCurrentUser } from 'services/auth/auth.api';
import {
  setTableId as setTableIdStorage,
  removeTableId,
} from 'core/utils/table';
import { useCharacter } from 'contexts/CharacterContext';

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
  const { setCharacterId } = useCharacter();

  const {
    data: table,
    isPending,
    isFetching,
    isError,
  } = useGetTable({ id: tableId });

  const setTableId = useCallback((id: number) => {
    setTableIdState(id);
  }, []);

  const clearTableId = useCallback(() => {
    setTableIdState(undefined);
  }, []);

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ['characters'] });
    setCharacterId(undefined);
  }, [setCharacterId, tableId]);

  useEffect(() => {
    if (!currentUser) {
      clearTableId();
    }
  }, [clearTableId, currentUser]);

  useEffect(() => {
    if (tableId) {
      setTableIdStorage(String(tableId));
    } else {
      removeTableId();
    }
  }, [tableId]);

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
