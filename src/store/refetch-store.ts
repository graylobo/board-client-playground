import { create } from "zustand";

interface RefetchStore {
  refetch: () => void;
  setRefetch: (refetch: () => void) => void;
}

export const useRefetchStore = create<RefetchStore>((set) => ({
  refetch: () => {},
  setRefetch: (refetch) => set({ refetch }),
}));
