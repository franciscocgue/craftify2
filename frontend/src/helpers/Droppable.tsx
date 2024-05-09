import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode } from 'react';

// needs a parent with size
// Droppable will fit all space (100%)

type propsT = {
  id: string,
  style?: CSSProperties,
  children?: ReactNode,
}

function Droppable({ id, style, children }: propsT) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const styles = {
    ...style,
    outline: isOver ? '2px solid red' : undefined,
    width: '100%',
    height: '100%',
  };

  return (
    <div id={id} ref={setNodeRef} style={styles}>
      {children}
    </div>
  );
}

export default Droppable;