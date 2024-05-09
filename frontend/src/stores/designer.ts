import { create } from 'zustand'

const useDesignerStore = create((set) => ({
  draggingId: null,
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
}));

export default useDesignerStore;