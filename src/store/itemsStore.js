import { create } from "zustand";

export const useItemsStore = create((set) => ({
  itemsStore: [],
  removeAllItemsStore: () => set({ itemsStore: [] }),
  updateItemsStore: (newItemsStore) => set({ itemsStore: newItemsStore }),
}));
