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
                    url: 'https://developer.mozilla.org/en-US/docs/Learn',
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
    },
    'condition': {
        parentType: 'General',
        creatableByUser: true,
        displayName: 'Condition',
        description: 'Branching condiitonal',
        defaultData: { // LogicNodeData<'condition'>
            function: {
                type: 'condition',
                parameters: {
                    conditionExpression: '{{true}}',
                }
            },
            targetHandleRight: true, // special case for IF condition
            targetHandleLeft: true, // special case for IF condition
            // targetHandleLeft: true, // special case for IF condition
            sourceHandle: false, // defaults to true if not given
        },
    },
    'docu-note': {
        parentType: 'Documentation',
        creatableByUser: true,
        displayName: 'Comment',
        description: 'Add a comment to document the flow',
        defaultData: { // LogicNodeData<'delay'>
            function: {
                type: 'docu-note',
                parameters: {
                    msg: '',
                }
            },
            targetHandle: false, // defaults to true if not given
            sourceHandle: false, // defaults to true if not given
        },
    },
    'toast': {
        parentType: 'Notification',
        creatableByUser: true,
        displayName: 'Toast message',
        description: 'Display a notification',
        defaultData: { // LogicNodeData<'delay'>
            function: {
                type: 'toast',
                parameters: {
                    msg: '',
                    position: 'bottom-right',
                    type: 'info',
                    autoClose: 3000,
                }
            },
        },
    },
    'set-variable': {
        parentType: 'Variables',
        creatableByUser: true,
        displayName: 'Set Variable',
        description: 'Update the value of a variable',
        defaultData: { // LogicNodeData<'delay'>
            function: {
                type: 'set-variable',
                parameters: {
                    variableKey: null,
                    value: null,
                }
            },
        },
    },
}

export {
    logicFunctions,
}