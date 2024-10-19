// available node logic functions
const logicFunctions = {
    'open-url': {
        parentType: 'Navigation',
        creatableByUser: true,
        displayName: 'Open URL',
        description: 'Open the given URL in this or a new tab',
        defaultData: { // LogicNodeData<'open-url'>
            function: {
                type: 'open-url',
                parameters: {
                    url: 'https://www.google.com/',
                    target: '_blank',
                }
            }
        }
    },
    'on-click-trigger': {
        parentType: 'Triggers',
        creatableByUser: false,
        displayName: 'On click',
        description: 'Trigger ac action when a click occurs',
        defaultData: { // LogicNodeData<'on-click-trigger'>
            function: {
                type: 'on-click-trigger',
                parameters: undefined
            },
            targetHandle: false,
        },
    },
    'delay': {
        parentType: 'General',
        creatableByUser: true,
        displayName: 'Delay',
        description: 'Delays the following action',
        defaultData: { // LogicNodeData<'delay'>
            function: {
                type: 'delay',
                parameters: {
                    ms: 3000,
                }
            },
        },
    }
}

export {
    logicFunctions,
}