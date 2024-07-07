import type { Coordinates } from '@dnd-kit/utilities';
import type { CollisionDescriptor, CollisionDetection } from '@dnd-kit/core';
import { getChildrenNodes } from '../utils';
import useDesignerStore from '../../stores/designer';


/* SOME NOTES
    There was some issues in terms of overlapping droppables in the case of 
    nested containers (parent inner droppable conflicted with child top droppable,
    for example).

    Solution: copied the pointerWithin solution from dnd-kit and customized
    how the droppables are sorted, so that the innest ones have priority.

    Seems to solve the issue, let's see what it all broke...

    Side note: there were issues when importing distanceBetween and cornersOfRectangle,
    so I just pasted the functions here.
*/

function distanceBetween(p1: Coordinates, p2: Coordinates) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function cornersOfRectangle({left, top, height, width}: ClientRect) {
    return [
      {
        x: left,
        y: top,
      },
      {
        x: left + width,
        y: top,
      },
      {
        x: left,
        y: top + height,
      },
      {
        x: left + width,
        y: top + height,
      },
    ];
  }

/**
 * Sort collisions
 */
function sortCollisionsDesc(
    //   { data: { value: a } }: { data: { value: number } },
    //   { data: { value: b } }: { data: { value: number } },
    val1, val2
) {

    const id1 = val1.data.droppableContainer.data.current.componentId;
    const id2 = val2.data.droppableContainer.data.current.componentId;
    const components = useDesignerStore.getState().components;

    const isChild_1 = getChildrenNodes(id1, components).includes(id2);
    const isChild_2 = getChildrenNodes(id2, components).includes(id1);

    return isChild_1 ? 1 : isChild_2 ? -1 : 0;
}

/**
 * Check if a given point is contained within a bounding rectangle
 */
function isPointWithinRect(point: Coordinates, rect: ClientRect): boolean {
    const { top, left, bottom, right } = rect;

    return (
        top <= point.y && point.y <= bottom && left <= point.x && point.x <= right
    );
}

/**
 * Returns the rectangles that the pointer is hovering over
 */
export const myPointerWithin: CollisionDetection = ({
    droppableContainers,
    droppableRects,
    pointerCoordinates,
}) => {
    if (!pointerCoordinates) {
        return [];
    }

    const collisions: CollisionDescriptor[] = [];

    for (const droppableContainer of droppableContainers) {
        const { id } = droppableContainer;
        const rect = droppableRects.get(id);

        if (rect && isPointWithinRect(pointerCoordinates, rect)) {
            /* There may be more than a single rectangle intersecting
             * with the pointer coordinates. In order to sort the
             * colliding rectangles, we measure the distance between
             * the pointer and the corners of the intersecting rectangle
             */
            const corners = cornersOfRectangle(rect);
            const distances = corners.reduce((accumulator, corner) => {
                return accumulator + distanceBetween(pointerCoordinates, corner);
            }, 0);
            const effectiveDistance = Number((distances / 4).toFixed(4));

            collisions.push({
                id,
                data: { droppableContainer, value: effectiveDistance },
            });
        }
    }

    return collisions.sort(sortCollisionsDesc);
};