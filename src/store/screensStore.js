import { create } from "zustand";

export const useBaseScreenStore = create((set) => ({
  baseScreenStore: "",
  removeAllBaseScreenStore: () => set({ baseScreenStore: [] }),
  updateBaseScreenStore: (newBaseScreenStore) =>
    set({ baseScreenStore: newBaseScreenStore }),
}));
