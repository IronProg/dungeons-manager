import { useTableFilterStore } from '@/core/stores/tableFilterStore';
import { useGetTable } from '@/services/tables/table.api';

export const useTable = () => {
  const tableId = useTableFilterStore((state) => state.tableId);
  const setTableId = useTableFilterStore((state) => state.setTableId);
  const clearTableId = useTableFilterStore((state) => state.clearTableId);

  const {
    data: table,
    isPending,
    isFetching,
    isError,
  } = useGetTable({ id: tableId });

  return {
    table,
    tableId,
    isPending,
    isFetching,
    isError,
    setTableId,
    clearTableId,
  };
};
