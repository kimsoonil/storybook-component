import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getClubBoardGroupsInit, postClubBoardGroupInit } from 'redux/store/clubSlice';

import { boardConstants } from 'constants';
import { Loader } from 'components/Loader';
import _ from 'lodash';
import BoardInfo from './BoardInfo';
import BoardGroupInfo from './BoardGroupInfo';
import { postBoardGroupBoardInit } from 'redux/store/boardGroupSlice';
import { BVD } from './index';
import { setAdminBoards } from 'redux/store/adminSlice';

// const BoardSidebar = ({ clubId, selectedContents = {}, setSelectedContents = () => {} }) => {
const BoardSidebar = ({ clubId, selected = {} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClubBoardGroupsInit({ id: clubId }));
  }, []);

  /**
   * boards: Array {
   *   id: 101
   *   name: string
   *   order: Number
   * }
   * club: Number
   * id: Number
   * name: String
   * order: Number
   */
  const clubState = useSelector((state) => state.club);
  // const { isLoading, baordGroups, postSu, error } = clubState;
  const boardGroups = clubState.boardGroups?.data;

  const [extendState, setExtendState] = useState({});
  const changeExtendState = useCallback(({ id, open }) => {
    setExtendState((prev) => ({ ...prev, [id]: open || !prev[id] }));
  }, []);

  /**
   * [{
   * boards: [],
   * id: 0,
   * name: '',
   * order: 0
   * }]
   */
  const [dropDownState, setDropDownState] = useState({ group: {}, board: {} });
  const [addState, setAddState] = useState({ group: false, board: false });

  const [newGroupName, setNewGroupName] = useState('');
  const createGroup = () => {
    newGroupName && dispatch(postClubBoardGroupInit({ id: clubId, data: { name: newGroupName, isActive: true } }));
    setNewGroupName('');
    setAddState((prev) => ({ ...prev, group: false }));
    // setSelectedContents({ type: 0 , id:  })
  };

  const [newBoardName, setNewBoardName] = useState('');
  const createBoard = (boardGroupId) => {
    newBoardName &&
      dispatch(postBoardGroupBoardInit({ id: boardGroupId, clubId, data: { name: newBoardName, isActive: true } }));
    setNewBoardName('');
    setAddState((prev) => ({ ...prev, board: false }));
  };

  const onClickBoardGroup = useCallback(({ id }) => {
    // setSelectedContents({ id, type: 0 });
    dispatch(setAdminBoards((prev) => ({ ...prev, selected: { id, type: 0 } })));
  }, []);

  const onClickBoard = useCallback(({ id }) => {
    // setSelectedContents({ id, type: 1 });
    dispatch(setAdminBoards((prev) => ({ ...prev, selected: { id, type: 1 } })));
  }, []);

  return (
    <div className="boards-sidebar ">
      <button
        className="add-group text-h4"
        onClick={() => {
          setAddState((prev) => ({ ...prev, group: true }));
        }}
      >
        {boardConstants.addGroup}
      </button>
      {_.sortBy(boardGroups, 'order').map((boardGroup) => {
        return (
          <div key={boardGroup.id}>
            <div
              className={`group-name-wrapper text-h5 ${
                selected.type === 0 && selected.id === boardGroup.id && 'group-name-wrapper-active'
              }`}
              onClick={() => {
                onClickBoardGroup({ id: boardGroup.id });
              }}
            >
              <img
                className="extend-image"
                src={
                  extendState[boardGroup.id]
                    ? require('images/admin/ic-select-arrow-close-on.svg').default
                    : require('images/admin/ic-select-arrow-open-on.svg').default
                }
                onClick={(e) => {
                  if (e.stopPropagation) {
                    e.stopPropagation();
                  }
                  changeExtendState({ id: boardGroup.id });
                }}
              />
              <div className="grow">{boardGroup.name}</div>

              {/* group 더보기 버튼 */}
              <div className="hover-option">
                <div
                  className="hover-option-button"
                  onClick={(e) => {
                    if (e.stopPropagation) {
                      e.stopPropagation();
                    }

                    setDropDownState((prev) => ({
                      ...prev,
                      group: { [boardGroup.id]: !prev.group[boardGroup.id] }
                    }));
                  }}
                >
                  <img src={require('images/admin/board/more-hor.svg').default} />
                </div>
                <div className={`drop-down ${!!dropDownState.group[boardGroup.id] && 'drop-down-active'}`} />
              </div>

              {/* group hover에 나오는 + 버튼 : 누르면 보드 추가 */}
              <div className="hover-option" onClick={() => {}}>
                <div
                  className="hover-option-button"
                  onClick={(e) => {
                    if (e.stopPropagation) {
                      e.stopPropagation();
                    }
                    changeExtendState({ id: boardGroup.id, open: true });
                    setAddState({ board: boardGroup.id });
                  }}
                >
                  <img src={require('images/admin/board/add-square.svg').default} />
                </div>
              </div>
            </div>

            {/* board list */}
            {extendState[boardGroup.id] &&
              _.sortBy(boardGroup.boards, 'order').map((board, boardIndex) => {
                return (
                  <div
                    key={boardIndex + board.name}
                    className={`board-name-wrapper text-h6 ${
                      selected.type === 1 && selected.id === board.id && 'board-name-wrapper-active'
                    }`}
                    onClick={() => {
                      onClickBoard({ id: board.id });
                    }}
                    style={{ ...{} }}
                  >
                    {board.name}
                  </div>
                );
              })}
            {/* board 추가하는 text input */}
            {addState.board === boardGroup.id && (
              <input
                type={'text'}
                className="add-text-input"
                value={newBoardName}
                onChange={(e) => {
                  setNewBoardName(e.target.value);
                }}
                autoFocus
                placeholder={BVD.addPlaceholder.board}
                onBlur={() => {
                  createBoard(addState.board);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createBoard(addState.board);
                  }
                }}
              />
            )}
          </div>
        );
      })}
      {!!addState.group && (
        <div className={{ padding: '0 15px' }}>
          <input
            type={'text'}
            className="add-text-input"
            value={newGroupName}
            onChange={(e) => {
              setNewGroupName(e.target.value);
            }}
            autoFocus
            placeholder={BVD.addPlaceholder.boardGroup}
            onBlur={createGroup}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createGroup();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BoardSidebar;
