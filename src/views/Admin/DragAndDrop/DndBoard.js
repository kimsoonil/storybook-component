import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DndBoard = ({ board, index }) => {
  return (
    <div className="task">
      <Draggable draggableId={board.id} index={index}>
        {(provided, snapshot) => {
          const style = { backgroundColor: snapshot.isDragging ? 'lightGreen' : 'white' };

          return (
            <div className="task-container" ref={provided.innerRef} {...provided.draggableProps}>
              <div className="task-inner" style={{ backgroundColor: snapshot.isDragging ? 'lightGreen' : 'white' }}>
                <div className="task-handle" {...provided.dragHandleProps} />
                <div>{board.name}</div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default DndBoard;
