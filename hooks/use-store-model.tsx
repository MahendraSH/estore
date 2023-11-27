import { create } from "zustand";

import { FC } from "react";

interface UseStoreModelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const UseStoreModel = create<UseStoreModelProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default UseStoreModel;
