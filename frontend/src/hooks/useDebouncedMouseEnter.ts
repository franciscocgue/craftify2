import { debounce } from "lodash";
import { useRef, useCallback } from "react";


// Type for the debounced function (avoid ts error on cancel method)
type DebouncedFunction = {
    (id: string): void;
    cancel: () => void;
};
/**
 * Sets a delay on mouse enter (mouse leave) to run a "setActive(id)"-type function
 *
 * @param setStatus - function triggered on mouseEnter/mouseLeave; must be a "setACtive(id)" function
 */
const useDebouncedMouseEnter = (setStatus: (selectedId: string | null) => void) => {
    // Use a ref to track the debounced update
    const debouncedUpdateRef = useRef<DebouncedFunction | null>(null);

    // Debounce function to ensure a final update after inactivity
    const debouncedUpdate = useCallback(debounce((id) => {
        setStatus(id);
    }, 300), [setStatus]);

    const handleMouseEnter = useCallback((id: string) => {
        // Clear any existing debounce
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }

        // Perform debounced update
        debouncedUpdateRef.current = debouncedUpdate;
        debouncedUpdate(id);
    }, [debouncedUpdate]);

    const handleMouseLeave = useCallback(() => {
        // Clear the debounced update on mouse leave
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }
        setStatus(null); // Optionally clear status on leave
    }, [setStatus]);

    return { handleMouseEnter, handleMouseLeave };
};


export {
    useDebouncedMouseEnter,
}