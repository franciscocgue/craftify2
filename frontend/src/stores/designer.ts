import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const components = {
  'canvas': {
    type: 'canvas',
    parent: null,
    children: ['994a18fa-b8d0-42e1-bc31-a510367b014b', '16586569-f34a-4066-9e17-192a9bbb6579', '460e5784-db2c-485b-9db1-216a4d706ed2'],
    name: 'Canvas'
  },
  '994a18fa-b8d0-42e1-bc31-a510367b014b': {
    type: 'button',
    parent: 'canvas',
    children: [],
    name: 'Button 1'
  },
  '16586569-f34a-4066-9e17-192a9bbb6579': {
    type: 'container-column',
    parent: 'canvas',
    children: ['b327b072-db49-4641-8079-69c5d8c06c97', 'aadbb64e-7c4e-4096-b67c-8b0658a592f8'],
    name: 'Container column'
  },
  'b327b072-db49-4641-8079-69c5d8c06c97': {
    type: 'button',
    parent: '16586569-f34a-4066-9e17-192a9bbb6579',
    children: [],
    name: 'Sub button 1'
  },
  'aadbb64e-7c4e-4096-b67c-8b0658a592f8': {
    type: 'button',
    parent: '16586569-f34a-4066-9e17-192a9bbb6579',
    children: [],
    name: 'Sub button 2'
  },
  '460e5784-db2c-485b-9db1-216a4d706ed2': {
    type: 'container-column',
    parent: 'canvas',
    children: [],
    name: 'Empty container'
  },
}


// types

type designerStore = {
  draggingId: string | null,
  isResizing: true | false,
  selectedId: string | null,
  hoveredId: string | null,
  components: any,
  setIsResizing: (isResizing: true | false) => void,
  setDraggingId: (draggingId: string | null) => void,
  setSelectedId: (selectedId: string | null) => void,
  setHoveredId: (selectedId: string | null) => void,
  /**
   * Moves component in the component tree
   *
   * @param {string} movedCompId - Component ID to be moved.
   * @param {string} movedOverCompId - Component ID over which dragged.
   * @param {'before' | 'after' | 'inside'} location - Where to move.
   *
   */
  moveComponent: (movedCompId: string, movedOverCompId: string, location: 'before' | 'after' | 'inside') => void,
  /**
   * Moves component in the component tree
   *
   * @param {string} compType - Component ID to be moved.
   * @param {string} addedOverCompId - Component ID over which dragged.
   * @param {'before' | 'after' | 'inside'} location - Where to move.
   *
   */
  addComponent: (compType: string, addedOverCompId: string, location: 'before' | 'after' | 'inside') => void
}

const useDesignerStore = create<designerStore>()(subscribeWithSelector((set) => ({
  draggingId: null,
  isResizing: false,
  selectedId: null,
  hoveredId: null,
  components: components,
  setIsResizing: (isResizing: true | false) => set({ isResizing: isResizing }),
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
  setSelectedId: (selectedId) => set({ selectedId: selectedId }),
  setHoveredId: (hoveredId) => set({ hoveredId: hoveredId }),
  moveComponent: (movedCompId, movedOverCompId, location) => set((state) => {
    const comps = { ...state.components };

    let newParentId: string;
    let newParent;
    let component = comps[movedCompId];
    let oldParent = comps[component.parent];

    if (location === 'inside') {
      // dragged inside container

      newParentId = movedOverCompId;
      const droppedSameParent = newParentId === component.parent;
      const droppedOnSelf = newParentId === movedCompId;
      if (droppedSameParent || droppedOnSelf) {
        // cancel
        return { components: comps }
      }
      newParent = comps[newParentId];

      // remove from prev parent
      oldParent.children = oldParent.children.filter((c: string) => c !== movedCompId);
      // add to new parent
      component.parent = newParentId;
      newParent.children.push(movedCompId);

      return { components: comps }

    } else {
      // dragged over another component (not container)

      newParentId = comps[movedOverCompId].parent;

      const droppedOnSelf = newParentId === movedCompId;
      if (droppedOnSelf) {
        // cancel
        return { components: comps }
      }

      newParent = comps[newParentId];

      // remove from prev parent
      oldParent.children = oldParent.children.filter((c: string) => c !== movedCompId);
      // add to new parent
      component.parent = newParentId;
      let insertAt = newParent.children.indexOf(movedOverCompId) + (location === 'after');
      newParent.children.splice(insertAt, 0, movedCompId);

      return { components: comps }

    }

  }),
  addComponent: (compType, addedOverCompId, location) => set((state) => {
    const comps = { ...state.components };

    let parentId: string;
    let parent;
    const compId = crypto.randomUUID();

    if (location === 'inside') {
      // dragged inside container

      parentId = addedOverCompId;
      parent = comps[parentId];
      // add component
      comps[compId] = {
        type: compType,
        parent: parentId,
        children: [],
        name: 'new component'
      }
      // add to parent
      parent.children.push(compId);

      return { components: comps }

    } else {
      // dragged over another component (not container)

      parentId = comps[addedOverCompId].parent;
      parent = comps[parentId];
      // add component
      comps[compId] = {
        type: compType,
        parent: parentId,
        children: [],
        name: 'new component'
      }
      // add to parent
      let insertAt = parent.children.indexOf(addedOverCompId) + (location === 'after');
      parent.children.splice(insertAt, 0, compId);

      return { components: comps }

    }

  })
})));

export default useDesignerStore;