import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DndTask from './DndTask';

const DndColumn = ({ column, tasks, onClickExpand }) => {
  return (
    <div className="column">
      <div className="column-container">
        <div className="column-title-wrapper">
          <div className="column-title">{column.title}</div>
          <button onClick={() => onClickExpand(column.id)} className="column-expand" />
        </div>
        {column.expanded && (
          <Droppable droppableId={column.id}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  className={`column-task-list ${column.expanded ? 'column-open' : 'column-close'}`}
                  {...provided.droppableProps}
                  style={{ backgroundColor: snapshot.isDraggingOver ? 'skyBlue' : 'white' }}
                >
                  {tasks.map((task, index) => (
                    <DndTask key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        )}
      </div>
    </div>
  );
};

export default DndColumn;
