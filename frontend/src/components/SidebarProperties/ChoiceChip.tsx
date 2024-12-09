import { ReactElement, useCallback, useEffect, useState } from 'react';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { Properties } from '../../types/designer.types';

import darkStyles from './ChoiceChipDark.module.css';
import lightStyles from './ChoiceChipLight.module.css';


type ChoiceChipProps = {
    display: string | ReactElement,
    propertyKey: string | [string, ...string[]], // if array, all properties assummed to have same value
    valueChip: string, // of chip
}

const ChoiceChip = ({ display, valueChip, propertyKey }: ChoiceChipProps) => {

    let propKey: string[];
    if (typeof propertyKey === 'string') {
        propKey = [propertyKey];
    } else {
        propKey = propertyKey;
    }

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;
    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);

    const propValue = useDesignerStore((state) => state.properties[selectedId as string]?.[propKey[0] as keyof Properties]);

    const handleDebounceFn = (selectedId: string, value: string) => {
        if (value === '') {
            const props = {} as Record<string, undefined>;
            propKey.forEach(prop => {
                props[prop] = undefined;
            })
            updateProperty(selectedId as string, props);
        }
        else {
            const props: Record<string, string> = {};
            propKey.forEach(prop => {
                props[prop] = value;
            })
            updateProperty(selectedId as string, props);
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);
    const handleClick = () => {
        debounceFn(selectedId as string, valueChip);
    }

    return (
        <div
            className={`${styles.wrapper} ${valueChip === propValue ? styles.selected : ''}`}
            onClick={handleClick}
        >{display}</div>
    )
}

export default ChoiceChip;