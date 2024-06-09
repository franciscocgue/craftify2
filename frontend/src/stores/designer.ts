import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { compTypes } from '../config/components';

const components = {
  'canvas': {
    type: 'canvas',
    parent: null,
    children: [],
    name: 'Canvas'
  },
}
// const componentsTest = {
//   'canvas': {
//     type: 'canvas',
//     parent: null,
//     children: ['994a18fa-b8d0-42e1-bc31-a510367b014b', '16586569-f34a-4066-9e17-192a9bbb6579', '460e5784-db2c-485b-9db1-216a4d706ed2'],
//     name: 'Canvas'
//   },
//   '994a18fa-b8d0-42e1-bc31-a510367b014b': {
//     type: 'button',
//     parent: 'canvas',
//     children: [],
//     name: 'Button 1'
//   },
//   '16586569-f34a-4066-9e17-192a9bbb6579': {
//     type: 'container-column',
//     parent: 'canvas',
//     children: ['b327b072-db49-4641-8079-69c5d8c06c97', 'aadbb64e-7c4e-4096-b67c-8b0658a592f8'],
//     name: 'Container column'
//   },
//   'b327b072-db49-4641-8079-69c5d8c06c97': {
//     type: 'button',
//     parent: '16586569-f34a-4066-9e17-192a9bbb6579',
//     children: [],
//     name: 'Sub button 1'
//   },
//   'aadbb64e-7c4e-4096-b67c-8b0658a592f8': {
//     type: 'button',
//     parent: '16586569-f34a-4066-9e17-192a9bbb6579',
//     children: [],
//     name: 'Sub button 2'
//   },
//   '460e5784-db2c-485b-9db1-216a4d706ed2': {
//     type: 'container-column',
//     parent: 'canvas',
//     children: [],
//     name: 'Empty container'
//   },
// }


// types

type designerStore = {
  draggingId: string | null,
  isResizing: true | false,
  selectedId: string | null,
  hoveredId: string | null,
  components: any,
  componentNames: any,
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
   * @param {'last' | 'first'} positionInContainer - When location=inside, whether position is first or last in container
   *
   */
  moveComponent: (movedCompId: string, movedOverCompId: string, location: 'before' | 'after' | 'inside', positionInContainer?: 'last' | 'first') => void,
  /**
   * Adds component in the component tree
   *
   * @param {string} compType - Component Type of new component.
   * @param {string} addedOverCompId - Component ID over which dragged.
   * @param {'before' | 'after' | 'inside' | 'auto'} location - Where to move. 'auto' means inside if over container, else after
   *
   */
  addComponent: (compType: string, addedOverCompId: string, location: 'before' | 'after' | 'inside' | 'auto') => void,
  /**
   * Removes component
   *
   * @param {string} compId - Component ID to be deleted.
   *
   */
  removeComponent: (compId: string) => void,
}

const useDesignerStore = create<designerStore>()(subscribeWithSelector((set) => ({
  draggingId: null,
  isResizing: false,
  selectedId: null,
  hoveredId: null,
  components: components,
  componentNames: {},
  setIsResizing: (isResizing: true | false) => set({ isResizing: isResizing }),
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
  setSelectedId: (selectedId) => set({ selectedId: selectedId }),
  setHoveredId: (hoveredId) => set({ hoveredId: hoveredId }),
  moveComponent: (movedCompId, movedOverCompId, location, positionInContainer = 'last') => set((state) => {
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
      // if positionInContainer==='first', move is valid (happened in tree)
      if (positionInContainer === 'last' && droppedSameParent || droppedOnSelf) {
        // cancel
        return { components: comps }
      }
      newParent = comps[newParentId];

      // remove from prev parent
      oldParent.children = oldParent.children.filter((c: string) => c !== movedCompId);
      // add to new parent
      component.parent = newParentId;
      if (positionInContainer === 'last') {
        newParent.children.push(movedCompId);
      } else {
        // first position in container
        newParent.children.splice(0, 0, movedCompId);
      }

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
    const compsNames = { ...state.componentNames };

    if (!Object.keys(compsNames).includes(compType)) {
      compsNames[compType] = {
        current: 1,
      }
    } else {
      compsNames[compType].current += 1;
    }

    let parentId: string;
    let parent;
    const compId = crypto.randomUUID();

    if (location === 'auto') {
      // @TODO: get all container types automatically
      if (['container-row', 'container-column', 'canvas'].includes(comps[addedOverCompId].type)) {
        location = 'inside';
      } else {
        location = 'after';
      }
    }

    if (location === 'inside') {
      // dragged inside container

      parentId = addedOverCompId;
      parent = comps[parentId];
      // add component
      comps[compId] = {
        type: compType,
        parent: parentId,
        children: [],
        name: `${compTypes[compType as keyof typeof compTypes].name} ${compsNames[compType].current}`
      }
      // add to parent
      parent.children.push(compId);

      return { components: comps, componentNames: compsNames }

    } else {
      // dragged over another component (not container)

      parentId = comps[addedOverCompId].parent;
      parent = comps[parentId];
      // add component
      comps[compId] = {
        type: compType,
        parent: parentId,
        children: [],
        name: `${compType} ${compsNames[compType].current}`
      }
      // add to parent
      let insertAt = parent.children.indexOf(addedOverCompId) + (location === 'after');
      parent.children.splice(insertAt, 0, compId);

      return { components: comps, componentNames: compsNames }

    }

  }),
  removeComponent: (compId) => set((state) => {
    const comps = { ...state.components };

    const getChildrenRecursive = (compId: string, childrenIds: string[], comps) => {
      for (let c of comps[compId].children) {
        childrenIds.push(c);
        getChildrenRecursive(c, childrenIds, comps)
      }
      return
    }

    const compsToDelete: string[] = [compId];
    getChildrenRecursive(compId, compsToDelete, comps)

    // remove objects, and children
    const newComponents = Object.keys(comps)
      .filter(c => !compsToDelete.includes(c))
      .reduce((obj, compId) => {
        let comp = comps[compId];
        comp.children = comp.children.filter(cc => !compsToDelete.includes(cc));
        obj[compId] = comp;
        return obj;
      }, {});

    return { components: newComponents }

  }),
})));

export default useDesignerStore;