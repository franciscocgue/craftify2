import { toast } from "react-toastify";
import { FunctionTypes, LogicFunctionHandler } from "../types/index.types";
import { parseToastAutoClose } from "../helpers/utils";
import { useVariableStore } from "../stores/variableStore";
import { userInputToValue } from "../helpers/dsl-utils";


// available node logic functions
const logicFunctionHandlers: Record<FunctionTypes, { handler: Function }> = {
    'open-url': {
        handler: async (params: LogicFunctionHandler<'open-url'>) => {
            const variables = useVariableStore.getState().variables;
            const url = userInputToValue(params.url, variables);
            var win = window.open(url, params.target);
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
            const variables = useVariableStore.getState().variables;
            const autoClose = userInputToValue(params.autoClose, variables);
            const options = {
                autoClose: parseToastAutoClose(`${autoClose}`) as number | false,
                position: params.position,
                pauseOnHover: true,
            };
            const msg = userInputToValue(params.msg, variables);
            toast[params.type](msg, options);
            return Promise.resolve();
        }
    },
    'set-variable': {
        handler: (params: LogicFunctionHandler<'set-variable'>) => {
            const variables = useVariableStore.getState().variables;
            const value = userInputToValue(params.value, variables);
            useVariableStore.getState().setVariable(params.variableKey, value);
            return Promise.resolve();
        }
    },
    'condition': {
        handler: (params: LogicFunctionHandler<'condition'>) => {
            const variables = useVariableStore.getState().variables;
            const conditionExpression = userInputToValue(params.conditionExpression, variables);
            // true means right; false, left
            return Promise.resolve(conditionExpression);
        }
    },
}

export {
    logicFunctionHandlers,
}