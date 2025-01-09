import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Variable } from '../types/index.types';

const initialVariables: Variable[] = __APP_CONFIG_VARIABLES__ as Variable[];

type VariableStore = {
    variables: Variable[],
    setVariable: (key: string, value: any) => void,
    // createVariable: (key: string, value: any, type: Variable["type"]) => void,
}

export const useVariableStore = create<VariableStore>()(subscribeWithSelector((set) => ({
    variables: initialVariables,
    setVariable: (key, value) =>
        set((state) => ({
            variables: state.variables.map(variable =>
                variable.key === key ? { ...variable, value } : variable
            ),
        })),
    // createVariable: (key, value, type) =>
    //     set((state) => ({
    //         variables: [
    //             ...state.variables,
    //             { key, value, type },
    //         ],
    //     })),
})));