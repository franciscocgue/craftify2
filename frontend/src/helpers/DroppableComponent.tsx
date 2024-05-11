import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useEffect } from 'react';

// needs a parent with size
// Droppable will fit all space (100%)

type propsT = {
  id: string,
  style?: CSSProperties,
  children?: ReactNode,
}

function DroppableComponent({ id, style, children }: propsT) {
  const { isOver, setNodeRef, node, rect, active } = useDroppable({
    id: id,
  });
  const styles = {
    ...style,
    // outline: isOver ? '2px solid red' : undefined,
    borderTop: isOver ? '2px solid red' : undefined,
    marginTop: isOver ? '-2px' : undefined,
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    console.log('CHANGED ' + id)
    console.log(node?.current.clientWidth)
    console.log(rect)
    console.log(active)
    console.log('#### end ####')
  }, [isOver])

  return (
    <div id={id} ref={setNodeRef} style={styles}>
      {children}
    </div>
  );
}

export default DroppableComponent;