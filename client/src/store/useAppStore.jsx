
import { create } from "zustand";

export const useAppStore = create((set) => ({
  isShowModal: false,
  contentModal: null,
  isLoading: false,
  setModal: (isShowModal, contentModal) => 
    set(() => ({ isShowModal, contentModal })),
  setLoading: (isLoading) => set(() => ({isLoading}))
}))
