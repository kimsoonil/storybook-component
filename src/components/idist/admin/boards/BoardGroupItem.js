import useDetectClose from 'hooks/useDetectClose';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { getBoardGroupInit, renameBoardGroupInit } from 'redux/idistStore/admin/boardAdminSlice';
import { BVD } from 'views/Admin/Boards';
import BoardSidebarNameInput from './BoardSidebarNameInput';

const BoardGroupItem = ({ boardGroup, addState, setAddState, children }) => {
  const dispatch = useDispatch();
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;
  const selected = useSelector((state) => state.boardAdmin.selected);
  const isSelected = useMemo(() => selected.contentsType === 'group' && selected.id === boardGroup.id, [selected]);

  const [isExpanded, setExpanded] = useState(false);

  const dropDownButtonRef = useRef(null);
  const [dropdownState, setDropdownState] = useDetectClose(dropDownButtonRef, false);

  const selectedClassName = useMemo(
    () => (isSelected || dropdownState ? 'selected' : 'none'),
    [dropdownState, isSelected]
  );
  const dropdownSelectedClassName = useMemo(() => (dropdownState ? 'selected' : 'none'), [dropdownState]);
  const activeClassName = useMemo(() => (boardGroup.is_active ? 'active' : 'inactive'), [boardGroup.is_active]);

  const stopPropagation = (e) => e?.stopPropagation();

  const onClickGroup = ({ id }) => {
    dispatch(getBoardGroupInit({ id }));
  };

  const expandImage = useMemo(
    () =>
      isExpanded
        ? require('images/admin/ic-select-arrow-close-on.svg').default
        : require('images/admin/ic-select-arrow-open-on.svg').default,
    [isExpanded]
  );
  const onClickExpand = (e) => {
    stopPropagation(e);
    setExpanded((prev) => !prev);
  };

  const [renameState, setRenameState] = useState(false);
  const [name, setName] = useState(boardGroup.name);
  const onRename = ({ id, value, clubId }) => {
    dispatch(renameBoardGroupInit({ id, data: { name: value }, clubId }));
    setRenameState(false);
  };

  const onClickAddBoard = (id) => {
    setExpanded(true);
    setAddState({ boardParent: id });
  };

  const [boardName, setBoardName] = useState('');

  return (
    <>
      {renameState ? (
        <div className="pl-15 pr-15">
          <BoardSidebarNameInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={BVD.addPlaceholder.boardGroup}
            onRename={(e) => onRename({ id: boardGroup.id, value: e.target.value, clubId })}
          />
        </div>
      ) : (
        <div
          className={`gp-name text-h5 gp-name-${selectedClassName} `}
          onClick={() => onClickGroup({ id: boardGroup.id })}
        >
          <img className="expand-image" src={expandImage} onClick={onClickExpand} />
          <div className={`gp-name-text gp-name-text-${activeClassName}`}>{boardGroup.name}</div>

          {boardGroup?.type !== 'DEFAULT' && (
            <>
              <div className={`hover-option hover-option-${selectedClassName}`} onClick={stopPropagation}>
                <div
                  className="hover-option-button"
                  onClick={() => setDropdownState((prev) => !prev)}
                  ref={dropDownButtonRef}
                >
                  <img src={require('images/admin/board/more-hor.svg').default} />
                </div>

                <div className={`drop-down drop-down-${dropdownSelectedClassName}`}>
                  <div className={'drop-down-item'} onClick={() => setRenameState(true)}>
                    {BVD.dropdown.rename}
                  </div>
                  <div
                    className={'drop-down-item'}
                    onClick={() => confirm(`dialog 개수 제한 + ${boardGroup.is_active}`)}
                  >
                    {BVD.dropdown.active(boardGroup.is_active)}
                  </div>
                </div>
              </div>

              <div className={`hover-option hover-option-${selectedClassName}`}>
                <div
                  className="hover-option-button"
                  onClick={() => {
                    onClickAddBoard(boardGroup.id);
                  }}
                >
                  <img src={require('images/admin/board/add-square.svg').default} />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {isExpanded && children}

      {addState.boardParent === boardGroup.id && (
        <div className="pl-30 pr-15">
          <BoardSidebarNameInput
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            placeholder={BVD.addPlaceholder.board}
          />
        </div>
      )}
    </>
  );
};

export default BoardGroupItem;
