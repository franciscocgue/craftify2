import { toast } from "react-toastify";
import { FunctionTypes, LogicFunctionHandler } from "../types/index.types";
import { parseToastAutoClose } from "../helpers/utils";


// available node logic functions
const logicFunctionHandlers: Record<FunctionTypes, { handler: Function }> = {
    'open-url': {
        handler: async (params: LogicFunctionHandler<'open-url'>) => {
            var win = window.open(params.url, params.target);
            if (win !== null) { win.focus(); }
            return Promise.resolve();
        }
    },
    'on-click-trigger': {
        handler: async () => {
            // Default handler that always resolves
            return Promise.resolve();
        }
    },
    'delay': {
        // handler: async (params: LogicNodeData<'delay'>['function']['parameters']) => {
        handler: async (params: LogicFunctionHandler<'delay'>) => {
            await new Promise(res => setTimeout(res, params.ms));
            return Promise.resolve();
        }
    },
    'docu-note': {
        handler: async () => {
            return Promise.resolve();
        }
    },
    'toast': {
        handler: (params: LogicFunctionHandler<'toast'>) => {
            const options = {
                autoClose: parseToastAutoClose(params.autoClose) as number | false,
                position: params.position,
                pauseOnHover: true,
            };
            toast[params.type](params.msg, options);
            return Promise.resolve();
        }
    },
}

export {
    logicFunctionHandlers,
}