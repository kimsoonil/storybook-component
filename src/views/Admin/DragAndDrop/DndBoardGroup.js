import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DndBoard from './DndBoard';

const DndBoardGroup = ({ boardGroup, onClickExpand, expandList, a }) => {
  return (
    <div className="column">
      <div className="column-container">
        <div className="column-title-wrapper">
          <div className="column-title" {...a}>
            {boardGroup.name}
          </div>
          <button onClick={() => onClickExpand(boardGroup.id)} className="column-expand" />
        </div>
        <Droppable
          droppableId={boardGroup.id}
          // mode={'virtual'}
          // renderClone={(rcProvided, snapshot, rubric) => {
          //   return (
          //     <div ref={rcProvided.innerRef} {...rcProvided.droppableProps} {...rcProvided.draggableProps}>
          //       hahaha
          //     </div>
          //   );
          // }}
        >
          {(provided, snapshot) => {
            return (
              <>
                {expandList.includes(boardGroup.id) ? (
                  <div
                    ref={provided.innerRef}
                    className={`column-task-list`}
                    {...provided.droppableProps}
                    // style={{ backgroundColor: snapshot.isDraggingOver ? 'skyBlue' : 'white' }}
                  >
                    {boardGroup.boards.map((board, index) => (
                      <DndBoard key={board.id} board={board} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                ) : (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {provided.placeholder}
                  </div>
                )}
              </>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default DndBoardGroup;
