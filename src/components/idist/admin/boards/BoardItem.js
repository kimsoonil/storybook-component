import useDetectClose from 'hooks/useDetectClose';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { getBoardGroupInit, getBoardInit, renameBoardInit } from 'redux/idistStore/admin/boardAdminSlice';
import { BVD } from 'views/Admin/Boards';
import BoardSidebarNameInput from './BoardSidebarNameInput';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;
  const stopPropagation = (e) => e?.stopPropagation();

  const selected = useSelector((state) => state.boardAdmin.selected);
  const isSelected = useMemo(() => selected.contentsType === 'board' && selected.id === board.id, [selected]);

  const boardType = useMemo(
    () =>
      board.type === 'ALL' || board.type === 'NOTICE' || board.type === 'EVENT'
        ? 'default'
        : board.type === 'VIDEO' || board.type === 'GALLERY'
        ? 'media'
        : 'none',
    []
  );

  const dropDownButtonRef = useRef(null);
  const [dropdownState, setDropdownState] = useDetectClose(dropDownButtonRef, false);

  const selectedClassName = useMemo(
    () => (isSelected || dropdownState ? 'selected' : 'none'),
    [dropdownState, isSelected]
  );
  const dropdownSelectedClassName = useMemo(() => (dropdownState ? 'selected' : 'none'), [dropdownState]);
  const activeClassName = useMemo(() => (board.is_active ? 'active' : 'inactive'), [board.is_active]);

  const [renameState, setRenameState] = useState(false);
  const [name, setName] = useState(board.name);
  const onRename = ({ id, value, clubId }) => {
    dispatch(renameBoardInit({ id, data: { name: value }, clubId }));
    setRenameState(false);
  };

  return (
    <>
      <div>
        {renameState ? (
          <div className="pl-30 pr-15">
            <BoardSidebarNameInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              onRename={(e) => onRename({ id: board.id, value: e.target.value, clubId })}
              placeholder={BVD.addPlaceholder.board}
            />
          </div>
        ) : (
          <div
            className={`bd-name text-h6 bd-name-${selectedClassName}`}
            onClick={() => dispatch(getBoardInit({ id: board.id }))}
          >
            <div className={`bd-name-text bd-name-text-${activeClassName}`}>{board.name}</div>
            {board.type !== 'default' && (
              <div className={`hover-option hover-option-${selectedClassName}`} onClick={stopPropagation}>
                <div
                  className="hover-option-button"
                  onClick={() => setDropdownState((prev) => !prev)}
                  ref={dropDownButtonRef}
                >
                  <img src={require('images/admin/board/more-hor.svg').default} />
                </div>

                <div className={`drop-down drop-down-${dropdownSelectedClassName}`}>
                  {boardType !== 'media' && (
                    <div className={'drop-down-item'} onClick={() => setRenameState(true)}>
                      {BVD.dropdown.rename}
                    </div>
                  )}
                  <div className={'drop-down-item'} onClick={() => confirm(`dialog 개수 제한 + ${board.is_active}`)}>
                    {BVD.dropdown.active(board.is_active)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BoardItem;
