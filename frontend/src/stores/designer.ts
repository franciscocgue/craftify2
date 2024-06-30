import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { compProperties, compTypes } from '../config/components';
import { draggableData } from '../vite-env';

const initialComponents = {
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
  activeMenu: 'designer' | 'variables' | 'data' | 'styles',
  draggingId: string | null,
  draggable: draggableData,
  isResizing: true | false,
  selectedId: string | null,
  hoveredId: string | null,
  components: any,
  properties: any,
  componentNames: any,
  setActiveMenu: (menu: 'designer' | 'variables' | 'data' | 'styles') => void,
  setIsResizing: (isResizing: true | false) => void,
  setDraggingId: (draggingId: string | null) => void,
  setDraggable: (draggable: draggableData) => void,
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
  addComponent: (compType: keyof typeof compTypes, addedOverCompId: string, location: 'before' | 'after' | 'inside' | 'auto') => void,
  /**
   * Removes component
   *
   * @param {string} compId - Component ID to be deleted.
   *
   */
  removeComponent: (compId: string) => void,
  updateProperty: (compId: string, propertyKey: string, propertyValue: any) => void,
}

const useDesignerStore = create<designerStore>()(subscribeWithSelector((set) => ({
  activeMenu: 'designer',
  draggingId: null,
  draggable: null,
  isResizing: false,
  selectedId: null,
  hoveredId: null,
  components: initialComponents,
  properties: { canvas: compProperties['canvas'] },
  componentNames: {},
  setActiveMenu: (menu => set({ activeMenu: menu })),
  setIsResizing: (isResizing: true | false) => set({ isResizing: isResizing }),
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
  setDraggable: (draggable) => set({ draggable: draggable }),
  setSelectedId: (selectedId) => set((state) => {
    if (!!state.draggingId) {
      return state
    }
    return { selectedId: selectedId }
  }),
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
    const props = { ...state.properties };
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

    props[compId] = compProperties[compType as keyof typeof compProperties];

    if (location === 'auto') {
      // @TODO: get all container types automatically
      if (['row', 'column', 'canvas'].includes(comps[addedOverCompId].type)) {
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

      return { components: comps, componentNames: compsNames, properties: props }

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

      return { components: comps, componentNames: compsNames, properties: props }

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
  updateProperty: (compId, key, value) => set((state) => {
    // console.log('UPDATING PROPERTIES')
    // const props = { ...state.properties };
    // console.log(props)
    // console.log('before')
    // console.log(props[compId][key])
    // props[compId][key] = value;
    // console.log('after')
    // console.log(props[compId][key])
    // console.log('all')
    // console.log(props)
    // console.log('FINISHED UPDATING PROPERTIES')

    const props = { ...state.properties };
    const updatedComp = { ...props[compId] };
    updatedComp[key] = value;
    props[compId] = updatedComp;

    return { properties: props }
  })
})));

export default useDesignerStore;