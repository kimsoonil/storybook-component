/* eslint-disable react/jsx-props-no-spreading */
import _ from 'lodash';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from './BoardItem';

function BoardList({
  boardGroup,
  addState,
  setAddState,
  renameTitle,
  setRenameTitle,
  renameState,
  setRenameState,
  // title,
  setTitle,
  // titleInputState,
  // setTitleInputState,
  moreOptionState,
  setMoreOptionState
}) {
  return (
    <Droppable droppableId={boardGroup.id.toString()}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {_.sortBy(boardGroup.boards, 'order').map((boardItem, boardIndex) => (
            <BoardItem
              key={boardItem.id}
              board={boardItem}
              index={boardIndex}
              addState={addState}
              setAddState={setAddState}
              renameTitle={renameTitle}
              setRenameTitle={setRenameTitle}
              renameState={renameState}
              setRenameState={setRenameState}
              setTitle={setTitle}
              moreOptionState={moreOptionState}
              setMoreOptionState={setMoreOptionState}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default BoardList;
