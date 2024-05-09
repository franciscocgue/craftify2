import {useDroppable} from '@dnd-kit/core';

// needs a parent with size
// Droppable will fit all space (100%)

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    ...props.style,
    outline: isOver ? '2px solid red' : undefined,
    width: '100%',
    height: '100%',
  };
  
  
  return (
    <div id={props.id} ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;