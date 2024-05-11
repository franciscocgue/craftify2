import { create } from 'zustand'

// test data
const components = {
  'canvas': {
    type: 'container-column',
    parentId: null,
  },
  'component-id1': {
    type: 'button',
    parentId: 'canvas',
  },
  'component-id2': {
    type: 'button',
    parentId: 'canvas',
  },
  'component-id3': {
    type: 'button',
    parentId: 'canvas',
  },
  'subcontainer1': {
    type: 'container-column',
    parentId: 'canvas',
  },
  'subcontainer2': {
    type: 'container-column',
    parentId: 'canvas',
  },
  'subsubcontainer1': {
    type: 'container-column',
    parentId: 'subcontainer2',
  },
}

// types

type designerStore = {
  draggingId: string | null,
  components: any,
  setDraggingId: (draggingId: string | null) => void,
}

const useDesignerStore = create<designerStore>((set) => ({
  draggingId: null,
  components: components,
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
}));

export default useDesignerStore;