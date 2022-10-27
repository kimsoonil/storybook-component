import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DndTask = ({ task, index }) => {
  return (
    <div className="task">
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => {
          const style = { backgroundColor: snapshot.isDragging ? 'lightGreen' : 'white' };

          return (
            <div
              className="task-container"
              ref={provided.innerRef}
              {...provided.draggableProps}
              // style={snapshot.isDragging ? { backgroundColor: 'lightGreen' } : { backgroundColor: 'white' }}
            >
              <div className="task-inner" style={{ backgroundColor: snapshot.isDragging ? 'lightGreen' : 'white' }}>
                <div className="task-handle" {...provided.dragHandleProps} />
                <div>{task.content}</div>
                <div>{snapshot.isDragging ? '1' : '2'}</div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default DndTask;
