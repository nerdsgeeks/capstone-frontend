import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessTokenStore: "",
  removeAllAccessTokenStore: () => set({ accessTokenStore: "" }),
  updateAccessTokenStore: (newAccessTokenStore) =>
    set({ accessTokenStore: newAccessTokenStore }),
}));

export const useEmployeeDetailsStore = create((set) => ({
  employeeDetailsStore: {},
  removeAllEmployeeDetailsStore: () => set({ employeeDetailsStore: [] }),
  updateEmployeeDetailsStore: (newEmployeeDetailsStore) =>
    set({ employeeDetailsStore: newEmployeeDetailsStore }),
}));
