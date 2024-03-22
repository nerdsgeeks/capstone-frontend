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

export const useRequestCartRoomSuppliesStore = create((set) => ({
  requestedItemsCartRoomSuppliesStore: [],
  removeAllRequestedItemsCartRoomSuppliesStore: () =>
    set({ requestedItemsCartRoomSuppliesStore: [] }),
  updateRequestedItemsCartRoomSuppliesStore: (
    newRequestedItemsCartRoomSuppliesStore,
  ) =>
    set({
      requestedItemsCartRoomSuppliesStore:
        newRequestedItemsCartRoomSuppliesStore,
    }),
}));

export const useRequestCartSuppliesStore = create((set) => ({
  requestedItemsCartSuppliesStore: [],
  removeAllRequestedItemsCartSuppliesStore: () =>
    set({ requestedItemsCartSuppliesStore: [] }),
  updateRequestedItemsCartSuppliesStore: (newRequestedItemsCartSuppliesStore) =>
    set({
      requestedItemsCartSuppliesStore: newRequestedItemsCartSuppliesStore,
    }),
}));
