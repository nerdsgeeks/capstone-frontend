import { create } from "zustand";

export const useRoomsStore = create((set) => ({
  roomsStore: [],
  removeAllRoomsStore: () => set({ roomsStore: [] }),
  updateRoomsStore: (newRoomsStore) => set({ roomsStore: newRoomsStore }),
}));

export const useRoomDetailsStore = create((set) => ({
  roomDetailsStore: {},
  removeAllRoomDetailsStore: () => set({ roomDetailsStore: {} }),
  updateRoomDetailsStore: (newRoomDetailsStore) =>
    set({ roomDetailsStore: newRoomDetailsStore }),
}));
