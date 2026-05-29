import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useCharacter } from '@/contexts/CharacterContext';
import { TableContext } from '@/contexts/TableContext';
import { queryClient } from '@/core/queryClient/queryClient';
import {
  setTableId as setTableIdStorage,
  removeTableId,
} from '@/core/utils/table';
import { useGetCurrentUser } from '@/services/auth/auth.api';
import { useGetTable } from '@/services/tables/table.api';
import type { Table } from '@/types/table';

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

  const setTableId = (id: number) => {
    setTableIdState(id);
  };

  const clearTableId = () => {
    setTableIdState(undefined);
  };

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
