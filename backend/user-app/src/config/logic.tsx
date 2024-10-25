// available node logic functions
const logicFunctionHandlers = {
    'open-url': {
        handler: (params: { url: string, target: '_blank' | '_self' }) => {
            var win = window.open(params.url, params.target);
            if (win !== null) { win.focus(); }
            return;
        }
    },
    'on-click-trigger': {
    },
    'delay': {
        // handler: async (params: LogicNodeData<'delay'>['function']['parameters']) => {
        handler: async (params: { ms: number }) => {
            await new Promise(res => setTimeout(res, params.ms));
            return;
        }
    },
    'docu-note': {
    },
}

export {
    logicFunctionHandlers,
}