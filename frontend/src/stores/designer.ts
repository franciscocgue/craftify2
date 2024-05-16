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
  isResizing: true | false,
  selectedId: string | null,
  components: any,
  setIsResizing: (isResizing: true | false) => void,
  setDraggingId: (draggingId: string | null) => void,
  setSelectedId: (selectedId: string | null) => void,
}

const useDesignerStore = create<designerStore>((set) => ({
  draggingId: null,
  isResizing: false,
  selectedId: null,
  components: components,
  setIsResizing: (isResizing: true | false) => set({ isResizing: isResizing }),
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
  setSelectedId: (selectedId) => {
    // console.log('hoveredId:' + hoveredId)
    set({ selectedId: selectedId })
  },
}));

export default useDesignerStore;