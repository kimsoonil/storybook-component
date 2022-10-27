/* eslint-disable */
import React, { useCallback, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { Draggable } from 'react-beautiful-dnd';
import { IVD } from 'views/Admin';
import { boardGroupPayload, boardType, viewModeType } from 'redux/idistApi/model';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoardGroupInit,
  renameBoardGroupInit,
  setInfo,
  switchActivateBoardGroupInit
} from 'redux/idistStore/admin/boardAdminSlice';
import JDropDown from '../JDropDown';
import { TextInput } from '../TextInput';
import BoardList from './BoardList';

const rootClassName = 'admin-boards-sidebar-boardGroup';

function BoardGroupItem({
  index,
  boardGroup,
  addState,
  setAddState,
  renameTitle,
  setRenameTitle,
  renameState,
  setRenameState,
  title,
  setTitle,
  titleInputState,
  setTitleInputState,
  moreOptionState,
  setMoreOptionState
}) {
  const dispatch = useDispatch();
  const [isExtended, setExtended] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const info = useSelector((state) => state.boardAdmin.info);

  const extendImageSrc = useMemo(
    () =>
      boardGroup.isActive
        ? isExtended
          ? require('images/admin/ic-select-arrow-open.svg').default
          : require('images/admin/ic-select-arrow-close.svg').default
        : isExtended
        ? require('images/admin/ic-select-arrow-open-disabled.svg').default
        : require('images/admin/ic-select-arrow-close-disabled.svg').default,
    [isExtended, boardGroup.isActive]
  );
  const moreOptionImg = useMemo(() => require('images/admin/board/ic-more.svg').default, []);
  const addImg = useMemo(() => require('images/admin/board/ic-plus-fill.svg').default, []);

  const isDefault = useMemo(() => boardGroup.type === boardType.DEFAULT, []);
  // const isMoreOptionActive = useMemo(() => moreOptionState?.group === boardGroup.id, [moreOptionState]);
  const isMoreOptionActive = useMemo(() => moreOptionState?.groupId === boardGroup.id, [moreOptionState]);
  const isSelected = useMemo(() => info?.isGroup && info?.id === boardGroup.id, [info]);

  const onClickExtend = useCallback((e) => {
    e?.stopPropagation();
    setExtended((prev) => !prev);
  }, []);

  const onClickGroup = useCallback(() => {
    dispatch(getBoardGroupInit({ id: boardGroup.id }));
  }, [addState]);

  const onClickMoreOption = useCallback((e) => {
    e?.stopPropagation();
    setAnchorEl(e.currentTarget);
    setMoreOptionState({ groupId: boardGroup.id });
  }, []);

  const onClickRename = useCallback(() => {
    setRenameTitle(boardGroup.title);
    setRenameState({ groupId: boardGroup.id });
    onCloseOption();
  }, [boardGroup.title]);

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
    dispatch(renameBoardGroupInit({ id: boardGroup.id, data: { title: renameTitle }, clubId: boardGroup.clubId }));
    setRenameState(null);
  }, [renameTitle]);

  const onClickActivation = useCallback(() => {
    dispatch(
      switchActivateBoardGroupInit({ id: boardGroup.id, data: boardGroupPayload({ isActive: !boardGroup.isActive }) })
    );
    onCloseOption();
  }, [boardGroup.isActive]);

  const onCloseOption = useCallback(() => {
    setAnchorEl(null);
    setMoreOptionState(null);
  }, []);

  const moreOptionList = useMemo(
    () =>
      boardGroup?.type === boardType.DEFAULT
        ? []
        : boardGroup?.type === boardType.MEDIA
        ? [{ label: 'menu2', onClick: onClickActivation }]
        : boardGroup?.type === boardType.NORMAL
        ? [
            { label: 'Rename', onClick: onClickRename },
            { label: boardGroup.isActive ? 'Deactivation' : 'Activation', onClick: onClickActivation }
          ]
        : [],
    [onClickRename, onClickActivation, boardGroup.isActive]
  );

  const onClickAddButton = useCallback(
    (e) => {
      e?.stopPropagation();
      if (addState?.groupId === boardGroup.id) {
        return;
      }
      if (addState) {
        confirm('다른 작업 중입니다.');
        return;
      }
      setTitle('');
      setExtended(true);
      setAddState({ groupId: boardGroup.id });
      dispatch(
        setInfo({
          clubId: boardGroup.clubId,
          boardGroupId: boardGroup.id,
          isActive: true,
          title: '',
          description: '',
          readPermission: 0,
          writePermission: 1,
          viewMode: viewModeType.LIST,
          isBoard: true
        })
      );
    },
    [addState]
  );

  return (
    <Draggable draggableId={boardGroup.id.toString()} index={index} isDragDisabled={isDefault}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {renameState?.groupId === boardGroup.id ? (
            <TextInput
              value={renameTitle}
              onChange={onChangeRenameTitle}
              autoFocus
              maxLength={20}
              state={IVD.focus}
              onBlur={() => rename()}
              containerProps={{ style: { margin: '8px 6px 8px 54px', height: '44px' } }}
            />
          ) : (
            <div
              className={`${rootClassName} ${isSelected && `${rootClassName}-selected`} `}
              style={snapshot.isDragging ? { backgroundColor: '#f8f8f8' } : {}}
              onClick={onClickGroup}
            >
              <img className="extend-image" src={extendImageSrc} onClick={onClickExtend} />
              <div className={`${rootClassName}-title ${!boardGroup.isActive && `${rootClassName}-title-disabled`}`}>
                {boardGroup.title}
              </div>
              <div className={`${rootClassName}-option ${isMoreOptionActive && `${rootClassName}-option-active`}`}>
                {!isDefault && (
                  <>
                    <img src={moreOptionImg} onClick={onClickMoreOption} />
                    <img src={addImg} onClick={onClickAddButton} />
                  </>
                )}
              </div>
              <JDropDown anchorEl={anchorEl} onClose={onCloseOption} menuList={moreOptionList} />
            </div>
          )}

          {isExtended && (
            <BoardList
              boardGroup={boardGroup}
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
          )}

          {addState?.groupId === boardGroup.id && (
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              maxLength={20}
              state={titleInputState}
              onFocus={() => setTitleInputState(IVD.focus)}
              onBlur={() => setTitleInputState(IVD.blur)}
              containerProps={{ style: { margin: '6px 6px 6px 54px', height: '40px' } }}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default BoardGroupItem;
