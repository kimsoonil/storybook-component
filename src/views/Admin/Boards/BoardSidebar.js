import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getClubBoardGroupsInit, postClubBoardGroupInit } from 'redux/idistStore/clubSlice';

import { Loader } from 'components/idist/Loader';
import _ from 'lodash';
import BoardInfo from './BoardInfo';
import BoardGroupInfo from './BoardGroupInfo';
import { postBoardGroupBoardInit } from 'redux/idistStore/boardGroupSlice';
import { BVD } from './index';
import { setAdminBoards } from 'redux/idistStore/adminSlice';
import useInput from 'hooks/useInput';

// const BoardSidebar = ({ clubId, selectedContents = {}, setSelectedContents = () => {} }) => {
const BoardSidebar = ({ clubId, selected = {} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClubBoardGroupsInit(clubId));
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
  const boardGroups = useSelector((state) => state.club.boardGroups?.data);
  // const { isLoading, baordGroups, postSu, error } = clubState;

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

  const groupName = useInput('');
  const addGroup = () => {
    const name = groupName.value;
    const isActive = boardGroups?.length < 10;
    name && dispatch(postClubBoardGroupInit({ id: clubId, data: { name, isActive } }));
    groupName.reset();
    setAddState((prev) => ({ ...prev, group: false }));
    // setSelectedContents({ type: 0 , id:  })
  };

  const boardName = useInput('');
  const addBoard = () => {
    const name = boardName.value;
    console.log(addState.board);
    name && dispatch(postBoardGroupBoardInit({ id: addState.board, clubId, data: { name, isActive: true } }));
    boardName.reset();
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
        {BVD.addGroup}
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
              <AddInput add={addBoard} placeholder={BVD.addPlaceholder.board} {...boardName} />
            )}
          </div>
        );
      })}
      {!!addState.group && <AddInput add={addGroup} placeholder={BVD.addPlaceholder.boardGroup} {...groupName} />}
    </div>
  );
};

export default BoardSidebar;

const AddInput = ({ value, onChange, add = () => {}, placeholder }) => (
  <input
    className="add-text-input"
    type={'text'}
    value={value}
    onChange={onChange}
    autoFocus
    maxLength={20}
    placeholder={placeholder}
    onBlur={add}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        add();
      }
    }}
  />
);
// const AddGroupInput = ({onChange, add, placeholder}) =>
// <input
//  className="add-text-input"
//   type={'text'}
//   value={newGroupName}
//   onChange={

//     (e) => {
//     setNewGroupName(e.target.value);
//   }}
//   autoFocus
//   placeholder={BVD.addPlaceholder.boardGroup}
//   onBlur={createGroup}
//   onKeyDown={(e) => {
//     if (e.key === 'Enter') {
//       createGroup();
//     }
//   }}
// />
