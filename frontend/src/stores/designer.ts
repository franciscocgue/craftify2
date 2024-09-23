import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { compProperties, compTypes } from '../config/components';
import { draggableData, Properties, Variables } from '../vite-env';
import { getChildrenNodes } from '../helpers/utils';

import components_ from '../../../backend/user-app/src/components.json';
import properties_ from '../../../backend/user-app/src/properties.json';

const initialNodes = [
  // { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: '1' } },
  // { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', type: 'trigger', position: { x: 0, y: 200 }, data: { label: '3' }, style: { width: 100, height: 30 } },
  // { id: '4', type: 'openUrl', position: { x: 0, y: 300 }, data: { label: '3' }, style: { width: 100, height: 30 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep' }];

const initialComponents = {
  'canvas': {
    type: 'canvas',
    parent: null,
    children: [],
    name: 'Canvas'
  },
}

type keyValuePair = {
  [key: string]: string
};

const compDuplicator = (comps, props, compsNames, compId: string, mapper: keyValuePair = {}, level: number = 0) => {
  if (!Object.keys(mapper).includes(comps[compId].parent)) {
    if (level === 0) {
      // same parent
      mapper[comps[compId].parent] = comps[compId].parent;
    } else {
      // new nested parent
      mapper[comps[compId].parent] = crypto.randomUUID();
    }
  }
  if (!Object.keys(mapper).includes(compId)) {
    mapper[compId] = crypto.randomUUID();
  }

  for (let childId of comps[compId].children) {
    mapper[childId] = crypto.randomUUID();
  }


  // add component
  comps[mapper[compId]] = {
    type: comps[compId].type,
    parent: mapper[comps[compId].parent],
    children: comps[compId].children.map(child => mapper[child]),
    name: `${compTypes[comps[compId].type as keyof typeof compTypes].name} ${compsNames[comps[compId].type].current + 1}`,
    // name: `${comps[compId].name} ${level + 1}`,
  }

  // add properties
  props[mapper[compId]] = props[compId]

  // update names
  compsNames[comps[mapper[compId]].type].current += 1;

  // add to parent
  if (level === 0) {
    let insertAt = comps[comps[compId].parent].children.indexOf(compId) + 1;
    comps[comps[compId].parent].children.splice(insertAt, 0, mapper[compId]);
  }

  level += 1;

  // add children
  for (let childId of comps[compId].children) {
    compDuplicator(comps, props, compsNames, childId, mapper, level);
  }



  // if children not empty, map each one to new uuid and call function again

  // duplicate component with new uuid (children, parent, main)

  // if children empty, duplicate (new uuid parent and main)
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
  page: 'designer' | 'variables' | 'data' | 'styles',
  colorMode: 'light' | 'dark',
  draggingId: string | null,
  draggable: draggableData,
  isResizing: true | false,
  selectedId: string | null,
  hoveredId: string | null,
  isCanvasScrolling: boolean,
  components: any,
  properties: any,
  variables: Variables,
  componentNames: any,
  expandAllProperties: boolean | null,
  // componentIds of component whose properties were updated last
  lastUpdatedCompChildren: string[],
  logicNodes: any, //EdgeType[],
  logicEdges: any, // NodeType[],
  setPage: (page: 'designer' | 'variables' | 'data' | 'styles') => void,
  toggleColorMode: () => void,
  renameComponent: (compId: string, newName: string) => void,
  setIsCanvasScrolling: (isCanvasScrolling: true | false) => void,
  setDraggingId: (draggingId: string | null) => void,
  setDraggable: (draggable: draggableData) => void,
  setSelectedId: (selectedId: string | null) => void,
  toggleSelectedId: (selectedId: string) => void,
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
  duplicateComponent: (compId: string) => void,
  updateProperty: (
    compId: string,
    properties: Properties,
    interfaceProps: { [k: string]: string | number | boolean | null | undefined }) => void,
  setExpandAllProperties: (isExpand: boolean | null) => void,
}

const useDesignerStore = create<designerStore>()(subscribeWithSelector((set) => ({
  page: 'designer',
  colorMode: 'light',
  draggingId: null,
  draggable: null,
  isResizing: false,
  selectedId: null,
  hoveredId: null,
  isCanvasScrolling: false,
  // components: initialComponents,
  // properties: { canvas: compProperties['canvas'] },
  components: components_,
  properties: properties_,
  variables: {
    name: {
      type: 'text',
      initialValue: 'James',
      value: 'James'
    },
    age: {
      type: 'number',
      initialValue: 30,
      value: 30
    },
    hasGlasses: {
      type: 'boolean',
      initialValue: true,
      value: true
    }
  },
  componentNames: {},
  expandAllProperties: false,
  lastUpdatedCompChildren: [],
  logicNodes: {}, //EdgeType[],
  logicEdges: {}, // NodeType[],
  setPage: page => set({ page }),
  toggleColorMode: () => set(state => ({ colorMode: state.colorMode === 'dark' ? 'light' : 'dark' })),
  renameComponent: (compId: string, newName: string) => set(state => {
    const components = { ...state.components };
    components[compId].name = newName;
    return {
      components
    }
  }),
  setIsCanvasScrolling: (isCanvasScrolling: true | false) => set({ isCanvasScrolling: isCanvasScrolling }),
  setDraggingId: (draggingId) => set({ draggingId: draggingId }),
  setDraggable: (draggable) => set({ draggable: draggable }),
  setSelectedId: (selectedId) => set((state) => {
    if (!!state.draggingId) {
      return state
    }
    return { selectedId: selectedId }
  }),
  toggleSelectedId: (selectedId) => set((state) => {
    if (!!state.draggingId) {
      return state
    }
    return { selectedId: state.selectedId === selectedId ? null : selectedId }
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

      return { components: comps, componentNames: compsNames, properties: props, selectedId: compId }

    } else {
      // dragged over another component (not container)

      parentId = comps[addedOverCompId].parent;
      parent = comps[parentId];
      // add component
      comps[compId] = {
        type: compType,
        parent: parentId,
        children: [],
        name: `${compTypes[compType as keyof typeof compTypes].name} ${compsNames[compType].current}`
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

    if (compId === state.selectedId) {
      return { components: newComponents, selectedId: null }
    }
    return { components: newComponents }

  }),
  duplicateComponent: (compId) => set((state) => {
    // code taken from addComponent and adapted
    // compType, addedOverCompId, location

    const comps = { ...state.components };
    const props = { ...state.properties };
    const compsNames = { ...state.componentNames };

    compDuplicator(comps, props, compsNames, compId, {}, 0);


    // compsNames[comps[compId].type].current += 1;

    // const newCompId = crypto.randomUUID();

    // props[newCompId] = { ...props[compId] };

    // let parent = comps[comps[compId].parent];
    // // add component
    // comps[newCompId] = {
    //   ...comps[compId],
    //   name: `${compTypes[comps[compId].type as keyof typeof compTypes].name} ${compsNames[comps[compId].type].current}`
    // }
    // // add to parent
    // let insertAt = parent.children.indexOf(compId) + 1;
    // parent.children.splice(insertAt, 0, newCompId);

    return {
      components: comps,
      properties: props
      // componentNames: compsNames, 
    }


  }),
  updateProperty: (compId, properties, interfaceProps) => set((state) => {

    const props = { ...state.properties };

    props[compId] = {
      values: { ...props[compId].values, ...properties },
      interfaceProps: { ...props[compId].interfaceProps, ...interfaceProps }
    };

    const components = { ...state.components }

    // children of updated component;
    // used for specific-target re-rendering based on subscriber
    const lastUpdatedCompChildren = getChildrenNodes(compId, components)

    return { properties: props, lastUpdatedCompChildren }
  }),
  setExpandAllProperties: (isExpand) => set({ expandAllProperties: isExpand }),
})));

export default useDesignerStore;