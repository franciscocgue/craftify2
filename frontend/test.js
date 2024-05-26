const components = {
  'canvas': {
    type: 'canvas',
    parent: null,
    children: ['1', '2', '3'],
    name: 'Canvas'
  },
  '1': {
    type: 'button',
    parent: 'canvas',
    children: [],
    name: 'Button 1'
  },
  '2': {
    type: 'container-column',
    parent: 'canvas',
    children: ['21', '22'],
    name: 'Container column'
  },
  '21': {
    type: 'button',
    parent: '2',
    children: [],
    name: 'Sub button 1'
  },
  '22': {
    type: 'button',
    parent: '2',
    children: [],
    name: 'Sub button 2'
  },
  '3': {
    type: 'container-column',
    parent: 'canvas',
    children: [],
    name: 'Empty container'
  },
}

const nestedData = [];

const formatData = (data, id, parent) => {
  if (data[id].children.length) {
    parent.push({
      id: id,
      name: data[id].name,
      children: [],
    })
    // const children = parent.children;
    data[id].children.forEach(child => formatData(data, child, parent[parent.length - 1].children))
  } else {
    parent.push({
      id: id,
      name: data[id].name
    })
  }
}

formatData(components, 'canvas', nestedData)
console.log(nestedData)