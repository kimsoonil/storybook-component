import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getClubBoardGroupsInit, postClubBoardGroupInit } from 'redux/idistStore/clubSlice';

import _ from 'lodash';
import { getBoardGroupInit, patchBoardGroupInit, postBoardGroupBoardInit } from 'redux/idistStore/boardGroupSlice';
import useInput from 'hooks/useInput';
import { getBoardInit, patchBoardInit } from 'redux/idistStore/boardSlice';
import { BVD } from 'views/Admin/Boards';
import MoreOptionButton from './MoreOptionButton';
import AddButton from './AddButton';

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
  const boardGroups = useSelector((state) => state.club.boardGroups?.data);
  // const { isLoading, boardGroups, postSu, error } = clubState;

  const stopPropagation = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const [expandState, setExpandState] = useState({});
  const changeExpandState = useCallback(({ id, open }) => {
    setExpandState((prev) => ({ ...prev, [id]: open || !prev[id] }));
  }, []);
  const getExpandImage = useCallback(
    (id) =>
      expandState[id]
        ? require('images/admin/ic-select-arrow-close-on.svg').default
        : require('images/admin/ic-select-arrow-open-on.svg').default,
    [expandState]
  );

  const [dropDownState, setDropDownState] = useState({}); // group: [열린 group id]
  const onClickOutside = () => setDropDownState({});

  const [addState, setAddState] = useState({ group: false, board: false });
  const onClickAddGroup = () => {
    if (boardGroups?.length > 9) {
      confirm('개수 제한 팝업');
    }
    setTimeout(() => {
      setAddState({ group: { parent: clubId } });
    }, 0);
  };
  const groupName = useInput({ initialValue: '', maxLength: 20 });
  const addGroup = () => {
    const name = groupName.props.value;
    const is_active = boardGroups?.length < 10;
    name && dispatch(postClubBoardGroupInit({ id: clubId, data: { name, is_active } }));
    groupName.reset();
    setAddState({});
  };
  const boardName = useInput({ initialValue: '', maxLength: 20 });
  const addBoard = (boardGroup) => {
    const name = boardName.props.value;
    const is_active = boardGroup.boards.length < 10;

    name &&
      dispatch(
        postBoardGroupBoardInit({
          id: boardGroup.id,
          data: { name, is_active },
          callback: ['ASDF'],
          actionList: [{ type: getClubBoardGroupsInit.type, payload: { id: clubId } }]
        })
      );
    boardName.reset();
    setAddState({});
  };

  const [renameState, setRenameState] = useState({ group: false, board: false });

  return (
    <div className="boards-sidebar ">
      <button className="add-group text-h4" onClick={onClickAddGroup}>
        {BVD.addGroup}
      </button>

      {/* 그룹 리스트 시작 */}
      {_.sortBy(boardGroups, 'order')
        .map((item, index) => (index > 9 ? { ...item, is_active: false } : { ...item, is_active: true }))
        .map((boardGroup) => {
          const isGroupSelected = selected.type === 0 && selected.id === boardGroup.id;
          const isDropDownActive = dropDownState?.group === boardGroup.id;
          const selectedGroupClassName = isGroupSelected || isDropDownActive ? 'selected' : 'none';

          const onClickGroup = () => {};

          const onClickExpandImage = (e) => {
            stopPropagation(e);
            changeExpandState({ id: boardGroup.id });
          };

          const onClickGroupMore = () => {
            setDropDownState((prev) => (prev?.group === boardGroup.id ? {} : { group: boardGroup.id }));
          };

          const renameGroupActive = renameState?.group === boardGroup.id;
          const onClickGroupRename = () => {
            groupName.init(boardGroup.name);
            setRenameState({ group: boardGroup.id });
          };
          const renameGroup = () => {
            const name = groupName?.props?.value;
            name &&
              dispatch(
                patchBoardGroupInit({
                  id: boardGroup.id,
                  data: { name },
                  actionList: [
                    { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
                    { type: getBoardGroupInit.type, payload: { id: boardGroup.id } }
                  ]
                })
              );
            groupName.reset();
            setRenameState({});
          };

          const onClickGroupActivation = () => {
            const text = boardGroup.is_active ? '비활성화 하시겠습니까?' : '활성화 하시겠습니까?';
            if (confirm(text, 'ok', 'cancel')) {
              dispatch(
                patchBoardGroupInit({
                  id: boardGroup.id,
                  data: { is_active: !boardGroup.is_active },
                  actionList: [
                    { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
                    { type: getBoardGroupInit.type, payload: { id: boardGroup.id } }
                  ]
                })
              );
            }
          };

          const onClickGroupPlus = (e) => {
            stopPropagation(e);
            if (boardGroup.boards.length > 9) {
              confirm('개수 제한 팝업');
              setTimeout(() => {
                setAddState({ board: { parent: boardGroup.id } });
              }, 0);
            }
            changeExpandState({ id: boardGroup.id, alwaysOpen: true });
            setAddState({ board: { parent: boardGroup.id } });
          };

          const isDefaultGroup = boardGroup?.name === 'Basic';
          const activeGroupClassName = boardGroup.is_active ? 'active' : 'inactive';

          return (
            <div key={boardGroup.id}>
              {renameGroupActive ? (
                <div className="pl-15 pr-15">
                  <NameInput submit={renameGroup} placeholder={BVD.addPlaceholder.board} {...groupName.props} />
                </div>
              ) : (
                <div
                  className={`gp-name text-h5 gp-name-${selectedGroupClassName} gp-name-${selectedGroupClassName}`}
                  onClick={onClickGroup}
                >
                  <img className="expand-image" src={getExpandImage(boardGroup.id)} onClick={onClickExpandImage} />
                  <div className={`gp-name-text gp-name-text-${activeGroupClassName}`}>{boardGroup.name}</div>
                  {!isDefaultGroup && (
                    <MoreOptionButton
                      onClick={onClickGroupMore}
                      onClickOutside={onClickOutside}
                      menuList={[
                        { label: BVD.dropdown.rename, onClick: onClickGroupRename },
                        { label: BVD.dropdown.active(boardGroup.is_active), onClick: onClickGroupActivation }
                      ]}
                    />
                  )}
                  <AddButton selected={isDropDownActive} onClick={onClickGroupPlus} />
                </div>
              )}

              {/* board list */}
              {expandState[boardGroup.id] &&
                _.sortBy(boardGroup.boards, 'order')
                  .map((item, index) => (index > 9 ? { ...item, is_active: false } : { ...item, is_active: true }))
                  .map((board, boardIndex) => {
                    const isBoardSelected = selected.type === 1 && selected.id === board.id;
                    const isBoardActive = dropDownState?.board === board.id;
                    const selectedBoardClassName = isBoardSelected || isBoardActive ? 'selected' : 'none';

                    const onClickBoard = () => {};
                    const onClickBoardMore = () => {
                      setDropDownState((prev) => (prev?.board === board.id ? {} : { board: board.id }));
                    };

                    const renameBoardActive = renameState?.board === board.id;
                    const onClickBoardRename = () => {
                      boardName.init(board.name);
                      setRenameState({ board: board.id });
                    };
                    const renameBoard = () => {
                      const name = boardName?.props?.value;
                      name &&
                        dispatch(
                          patchBoardInit({
                            id: board.id,
                            data: { name },
                            actionList: [
                              { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
                              { type: getBoardGroupInit.type, payload: { id: boardGroup.id } },
                              { type: getBoardInit.type, payload: { id: board.id } }
                            ]
                          })
                        );
                      boardName.reset();
                      setRenameState({});
                    };
                    const onClickBoardActivation = () => {
                      const text = board.is_active ? '비활성화 하시겠습니까?' : '활성화 하시겠습니까?';
                      if (confirm(text, 'ok', 'cancel')) {
                        dispatch(
                          patchBoardInit({
                            id: board.id,
                            data: { is_active: !board.is_active },
                            actionList: [
                              { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
                              { type: getBoardGroupInit.type, payload: { id: boardGroup.id } },
                              { type: getBoardInit.type, payload: { id: board.id } }
                            ]
                          })
                        );
                      }
                    };

                    // 임시
                    const boardType =
                      board.name === 'All' ||
                      board.name === 'Notice' ||
                      board.name === 'Event' ||
                      board.name === 'Member'
                        ? 'default'
                        : board.name === 'Video' || board.name === 'Gallery'
                        ? 'media'
                        : 'none';

                    const menuList =
                      boardType === 'media'
                        ? [{ label: BVD.dropdown.active(board.is_active), onClick: onClickBoardActivation }]
                        : [
                            { label: BVD.dropdown.rename, onClick: onClickBoardRename },
                            { label: BVD.dropdown.active(board.is_active), onClick: onClickBoardActivation }
                          ];
                    const activeBoardClassName = board.is_active ? 'active' : 'inactive';

                    return (
                      <div key={boardIndex + board.name}>
                        {renameBoardActive ? (
                          <div className="pl-30 pr-15">
                            <NameInput
                              submit={renameBoard}
                              placeholder={BVD.addPlaceholder.board}
                              {...boardName.props}
                            />
                          </div>
                        ) : (
                          <div
                            className={`bd-name text-h6 bd-name-${selectedBoardClassName} bd-name-${selectedBoardClassName}`}
                            onClick={onClickBoard}
                          >
                            <div className={`bd-name-text bd-name-text-${activeBoardClassName}`}>{board.name}</div>
                            {boardType !== 'default' && (
                              <MoreOptionButton
                                onClick={onClickBoardMore}
                                onClickOutside={onClickOutside}
                                menuList={menuList}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

              {/* board 추가하는 text input */}
              {addState?.board?.parent === boardGroup.id && (
                <div className="pl-30 pr-15">
                  <NameInput
                    submit={() => addBoard(boardGroup)}
                    placeholder={BVD.addPlaceholder.board}
                    {...boardName.props}
                  />
                </div>
              )}
            </div>
          );
        })}

      {addState?.group && (
        <div className="pl-15 pr-15">
          <NameInput submit={addGroup} placeholder={BVD.addPlaceholder.boardGroup} {...groupName.props} />
        </div>
      )}
    </div>
  );
};

export default BoardSidebar;

const NameInput = ({ value, onChange, submit = () => {}, placeholder }) => (
  <input
    className="boards-sidebar-name-input"
    type={'text'}
    value={value}
    onChange={onChange}
    autoFocus
    onFocus={(e) => {
      e.target.select();
    }}
    maxLength={20}
    placeholder={placeholder}
    onBlur={submit}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        submit();
      }
    }}
  />
);
