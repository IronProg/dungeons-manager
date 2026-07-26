import { create } from 'zustand';

type TableFilterState = {
  tableId?: number;
  setTableId: (id?: number) => void;
  clearTableId: () => void;
};

export const useTableFilterStore = create<TableFilterState>((set) => ({
  tableId: undefined,
  setTableId: (tableId) => set({ tableId }),
  clearTableId: () => set({ tableId: undefined }),
}));
