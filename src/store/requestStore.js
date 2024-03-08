import { create } from "zustand";

export const useRequestStore = create((set) => ({
  requestedItems: [],
  removeAllRequestedItems: () => set({ requestedItems: [] }),
  updateRequestedItems: (newRequestedItems) =>
    set({ requestedItems: newRequestedItems }),
}));
