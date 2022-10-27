/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import BoardGroupItem from './BoardGroupItem';
import JDropDown from '../JDropDown';
import { boardType } from 'redux/idistApi/model';

const BoardGroupList = ({
  addState,
  setAddState,

  renameTitle,
  setRenameTitle,
  renameState,
  setRenameState,

  title,
  setTitle,
  titleInputState,
  setTitleInputState
}) => {
  const boardGroups = useSelector((state) => state.boardAdmin.boardGroups);
  const [moreOptionState, setMoreOptionState] = useState(null);

  return (
    <DragDropContext>
      <Droppable droppableId={'group'} type={'parent'}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {_.sortBy(boardGroups, 'order').map((boardGroupItem, boardGroupIndex) => {
              return (
                <BoardGroupItem
                  key={boardGroupItem.id}
                  boardGroup={boardGroupItem}
                  index={boardGroupIndex}
                  addState={addState}
                  setAddState={setAddState}
                  renameTitle={renameTitle}
                  setRenameTitle={setRenameTitle}
                  renameState={renameState}
                  setRenameState={setRenameState}
                  title={title}
                  setTitle={setTitle}
                  titleInputState={titleInputState}
                  setTitleInputState={setTitleInputState}
                  moreOptionState={moreOptionState}
                  setMoreOptionState={setMoreOptionState}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardGroupList;
