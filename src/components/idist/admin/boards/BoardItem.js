/* eslint-disable */
import React, { useCallback, useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { boardPayload, boardType } from 'redux/idistApi/model';
import { getBoardInit, renameBoardInit, switchActivateBoardInit } from 'redux/idistStore/admin/boardAdminSlice';
import { IVD } from 'views/Admin';
import JDropDown from '../JDropDown';
import { TextInput } from '../TextInput';

const rootClassName = 'admin-boards-sidebar-board';

const BoardItem = ({
  board,
  index,
  addState,
  setAddState,
  renameTitle,
  setRenameTitle,
  renameState,
  setRenameState,
  setTitle,
  moreOptionState,
  setMoreOptionState
}) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.boardAdmin.info);

  const [anchorEl, setAnchorEl] = useState(null);

  const moreOptionImg = useMemo(() => require('images/admin/board/ic-more.svg').default, []);
  const isMoreOptionActive = useMemo(() => moreOptionState?.boardId === board.id, [moreOptionState]);
  const isDefault = useMemo(() => board.type === boardType.DEFAULT, []);
  const isSelected = useMemo(() => info?.isBoard && info?.id === board.id, [info]);

  const onClickBoard = useCallback(() => {
    dispatch(getBoardInit({ id: board.id }));
  }, []);

  const onClickMoreOption = useCallback((e) => {
    e?.stopPropagation();
    setAnchorEl(e.currentTarget);
    setMoreOptionState({ boardId: board.id });
  }, []);

  const onClickRename = useCallback(() => {
    setRenameTitle(board.title);
    setRenameState({ boardId: board.id });
    onCloseOption();
  }, [board.title]);

  const onChangeRenameTitle = useCallback(
    (e) => {
      if (isSelected) {
        setRenameTitle(e.target.value);
        setTitle(e.target.value);
      } else {
        setRenameTitle(e.target.value);
      }
    },
    [isSelected]
  );

  const rename = useCallback(() => {
    if (!renameTitle) {
      return;
    }
    dispatch(renameBoardInit({ id: board.id, data: { title: renameTitle }, clubId: board.clubId }));
    setRenameState(null);
  }, [renameTitle]);

  const onClickActivation = useCallback(() => {
    dispatch(switchActivateBoardInit({ id: board.id, data: boardPayload({ isActive: !board.isActive }) }));
    onCloseOption();
  }, [board.isActive]);

  const onCloseOption = useCallback(() => {
    setAnchorEl(null);
    setMoreOptionState(null);
  }, []);

  const moreOptionList = useMemo(() => {
    return board?.type === boardType.DEFAULT
      ? []
      : board?.type === boardType.MEDIA
      ? [{ label: board.isActive ? 'Deactivation' : 'Activation', onClick: onClickActivation }]
      : board?.type === boardType.NORMAL
      ? [
          { label: 'Rename', onClick: onClickRename },
          { label: board.isActive ? 'Deactivation' : 'Activation', onClick: onClickActivation }
        ]
      : [];
  }, [onClickRename, onClickActivation, board.isActive]);

  return (
    <Draggable key={board.id} draggableId={board.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {renameState?.boardId === board.id ? (
            <TextInput
              value={renameTitle}
              onChange={onChangeRenameTitle}
              autoFocus
              maxLength={20}
              state={IVD.focus}
              onBlur={() => rename()}
              containerProps={{ style: { margin: '6px 6px 6px 54px', height: '40px' } }}
            />
          ) : (
            <div
              className={`${rootClassName} ${isSelected && `${rootClassName}-selected`} `}
              style={snapshot.isDragging ? { backgroundColor: '#f8f8f8' } : {}}
              onClick={onClickBoard}
            >
              <div className={`${rootClassName}-title  ${!board.isActive && `${rootClassName}-title-disabled`}  `}>
                {board.title}
              </div>
              {!isDefault && (
                <div className={`${rootClassName}-option ${isMoreOptionActive && `${rootClassName}-option-active`}`}>
                  <img src={moreOptionImg} onClick={onClickMoreOption} />
                </div>
              )}

              <JDropDown anchorEl={anchorEl} onClose={onCloseOption} menuList={moreOptionList} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
