import { create } from "zustand";

export const useRequestStore = create((set) => ({
  requestedItems: [],
  removeAllRequestedItems: () => set({ requestedItems: [] }),
  updateRequestedItems: (newRequestedItems) =>
    set({ requestedItems: newRequestedItems }),
}));

export const useRequestCartStore = create((set) => ({
  requestedItemsCartStore: [],
  removeAllRequestedItemsCartStore: () => set({ requestedItemsCartStore: [] }),
  updateRequestedItemsCartStore: (newRequestedItemsCartStore) =>
    set({ requestedItemsCartStore: newRequestedItemsCartStore }),
}));
