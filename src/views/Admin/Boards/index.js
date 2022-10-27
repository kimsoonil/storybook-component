import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { getBoardGroupInit, patchBoardGroupInit, postBoardGroupBoardInit } from 'redux/idistStore/boardGroupSlice';
import { getBoardInit, getBoardPostsInit, patchBoardInit, resetBoardPosts } from 'redux/idistStore/boardSlice';
import MoreOptionButton from './BoardSidebar/MoreOptionButton';
import AddButton from './BoardSidebar/AddButton';
import ActivationInput from './Info/ActivationInput';
import DescriptionInput from './Info/DescriptionInput';
import PermissionInput from './Info/PermissionInput';
import ViewModeInput from './Info/ViewModeInput';
import Submit from './Info/Submit';
import NameInput from './Info/NameInput';
import { IVD } from '..';
import { showModal } from 'redux/idistStore/admin/modalSlice';
import ActiveGroupModal from 'components/idist/modal/ActiveGroupModal';
import ActiveBoardModal from 'components/idist/modal/ActiveBoardModal';
import DeactiveGroupModal from 'components/idist/modal/DeactiveGroupModal';
import DeactiveBoardModal from 'components/idist/modal/DeactiveBoardModal';
import WarnGroupCountModal from 'components/idist/modal/WarnGroupCountModal';
import WarnBoardCountModal from 'components/idist/modal/WarnBoardCountModal';
import Suspense from 'components/idist/admin/Suspense';
import MergeBoardDialog from 'components/idist/admin/dialog/MergeBoardDialog';
import {
  openDeleteBoardDialog,
  openDeleteGroupDialog,
  openMergeBoardDialog,
  openMergeGroupDialog
} from 'redux/idistStore/admin/dialogSlice';
import MergeGroupDialog from 'components/idist/admin/dialog/MergeGroupDialog';
import DeleteGroupDialog from 'components/idist/admin/dialog/DeleteGroupDialog';
import DeleteBoardDialog from 'components/idist/admin/dialog/DeleteBoardDialog';
import {
  getBoardGroupsInit,
  orderBoardGroupInit,
  orderBoardInit,
  postBoardGroupInit,
  setBoardAdminBoardGroups
} from 'redux/idistStore/admin/boardAdminSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Boards = () => {
  const dispatch = useDispatch();
  // 이거 사용할 것
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;

  const tmpBoardGroups = useSelector((state) => state.boardAdmin.boardGroups);
  const boardGroups = tmpBoardGroups.map((item) => ({
    ...item,
    name: item.title,
    boards: item.boards.map((item2) => ({ ...item2, name: item2.title }))
  }));

  // const newBoardGroup = useSelector((state) => state.boardAdmin.boardGroup);
  // const newBoard = useSelector((state) => state.boardAdmin.board);
  useEffect(() => {
    dispatch(getBoardGroupsInit({ id: clubId }));
  }, [clubId]);

  const tmpBoardGroup = useSelector((state) => state.boardGroup.boardGroup?.data);
  const boardGroup = useMemo(
    () => (tmpBoardGroup ? { ...tmpBoardGroup, name: tmpBoardGroup.title } : {}),
    [tmpBoardGroup]
  );
  const tmpBoard = useSelector((state) => state.board.board?.data);
  const board = useMemo(() => (tmpBoard ? { ...tmpBoard, name: tmpBoard.title } : {}), [tmpBoard]);
  const boardPosts = useSelector((state) => state.board.posts?.data);

  const postBoardTrigger = useSelector((state) => state.boardGroup.postBoardTrigger);

  const initialColaState = useMemo(
    () => ({
      type: '', // group , board
      isCreating: false,
      id: -1
    }),
    []
  );

  const [cola, setCola] = useState(initialColaState);
  const [expandState, setExpandState] = useState({});
  const [dropDownState, setDropDownState] = useState({}); // {group: [groupID, ...], board: [boardID, ...]}
  const [addState, setAddState] = useState({ group: false, board: false });
  const [renameState, setRenameState] = useState({ group: false, board: false });

  const [activationLabel, setActivationLabel] = useState('');
  const [sidebarName, setSidebarName] = useState('');
  const [name, setName] = useState('');
  const [nameInputState, setNameInputState] = useState(IVD.blur);
  const [description, setDescription] = useState('');
  const [permission, setPermission] = useState({ read: '', write: '', readGrade: '', writeGrade: '' });
  const [viewMode, setViewMode] = useState('');
  const [type, setType] = useState('');

  const isBoardGroupLimited = boardGroups?.filter?.((item) => item.is_active).length > 9;
  const getBoardLimited = (id) =>
    boardGroups?.find((item) => item.id === id)?.boards?.filter?.((item) => item.is_active).length > 9;

  // post data trigger
  useEffect(() => {
    if (postBoardTrigger?.id) {
      console.log('useEffect postBoardTrigger cola : ', cola);
      setCola({ id: postBoardTrigger.id, type: 'board', isCreating: false });
    }
  }, [postBoardTrigger?.id]);

  const initDefault = () => {
    if (cola.type === 'group') {
      setActivationLabel(isBoardGroupLimited ? BVD.activation.deactivation : BVD.activation.activation);
    } else {
      const boardParent = addState?.board?.parent;
      if (boardParent) {
        setActivationLabel(getBoardLimited(boardParent) ? BVD.activation.deactivation : BVD.activation.activation);
      }
    }
    setSidebarName('');
    setName('');
    setNameInputState(IVD.blur);
    setDescription('');
    setPermission({
      read: BVD.permission.staff.GUEST,
      write: BVD.permission.staff.GUEST,
      readGrade: BVD.permission.grade.BRONZE,
      writeGrade: BVD.permission.grade.BRONZE
    });
    setViewMode(BVD.viewMode.type.list);
    setType('NORMAL');
  };
  // sidebar 컨텐츠 클릭 -> cola id 변경 -> type, id 에 맞는 컨텐츠 로드
  useEffect(() => {
    if (cola.id > 0 && !cola.isCreating) {
      console.log('useEffect get Group||Board cola : ', cola);
      if (cola.type === 'group') {
        dispatch(getBoardGroupInit({ id: cola.id }));
      } else {
        dispatch(getBoardInit({ id: cola.id }));
      }
    } else {
      initDefault();
    }
  }, [cola]);

  // 보드그룹 초기화
  const initBoardGroup = (boardGroup) => {
    setActivationLabel(boardGroup.is_active ? BVD.activation.activation : BVD.activation.deactivation);
    setSidebarName(boardGroup.name);
    setName(boardGroup?.name || '');
    setNameInputState(IVD.blur);
    setType(boardGroup.type);
  };
  useEffect(() => {
    if (boardGroup) {
      console.log('useEffect boardGroup Change, init boardGroup : ', boardGroup);
      initBoardGroup(boardGroup);
    }
  }, [boardGroup]);

  // 보드 초기화
  const initBoard = (board) => {
    setActivationLabel(board.is_active ? BVD.activation.activation : BVD.activation.deactivation);
    setSidebarName(board.name);
    setName(board?.name || '');
    setNameInputState(IVD.blur);
    setDescription(board.description || '');
    setPermission(boardToPermission(board));
    setViewMode(board.view_mode);
    setType(board.type);
  };
  useEffect(() => {
    if (board) {
      console.log('useEffect board Change, init board : ', board);
      initBoard(board);
    }
  }, [board]);

  const stopPropagation = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const getType = (isGroup, type) => {
    let ret = 'normal';
    if (isGroup) {
      if (type === 'DEFAULT') {
        ret = 'default';
      }
    } else {
      if (type === 'ALL' || type === 'NOTICE' || type === 'EVENT') {
        ret = 'default';
      } else if (type === 'GALLERY' || type === 'VIDEO') {
        ret = 'media';
      }
    }
    return ret;
  };
  const permissionToServerData = (permission) => {
    const readPermission =
      permission.read === BVD.permission.staff.MEMBER
        ? BVD.permission.apiList.find((item) => item.type === permission.readGrade)?.value
        : BVD.permission.apiList.find((item) => item.type === permission.read)?.value;
    const writePermission =
      permission.write === BVD.permission.staff.MEMBER
        ? BVD.permission.apiList.find((item) => item.type === permission.writeGrade)?.value
        : BVD.permission.apiList.find((item) => item.type === permission.write)?.value;
    return { read_permission: readPermission, write_permission: writePermission };
  };
  const boardToPermission = (board) => {
    const ret = {};
    // set readPermission
    if (board.read_permission > 0 && board.read_permission < 7) {
      // MEMBER 인지 아닌지
      ret.read = BVD.permission.staff.MEMBER;
      ret.readGrade =
        BVD.permission.apiList.find((item) => item.value === board.read_permission)?.type ||
        BVD.permission.grade.BRONZE;
    } else {
      ret.read =
        BVD.permission.apiList.find((item) => item.value === board.read_permission)?.type || BVD.permission.staff.GUEST;
      ret.readGrade = BVD.permission.grade.BRONZE;
    }
    // set writePermission
    if (board.write_permission > 0 && board.write_permission < 7) {
      // MEMBER 인지 아닌지
      ret.write = BVD.permission.staff.MEMBER;
      ret.writeGrade =
        BVD.permission.apiList.find((item) => item.value === board.write_permission)?.type ||
        BVD.permission.grade.BRONZE;
    } else {
      ret.write =
        BVD.permission.apiList.find((item) => item.value === board.write_permission)?.type ||
        BVD.permission.staff.GUEST;
      ret.writeGrade = BVD.permission.grade.BRONZE;
    }

    return ret;
  };

  const hasGroupChanged = !_.isEqual(
    { name, is_active: activationLabel === BVD.activation.activation },
    { name: boardGroup?.name, is_active: boardGroup?.is_active }
  );
  const hasBoardChanged = !_.isEqual(
    {
      name,
      is_active: activationLabel === 'Activation',
      description,
      viewMode,
      ...permissionToServerData(permission)
    },
    {
      name: board?.name,
      is_active: board?.is_active,
      description: board?.description,
      viewMode: board?.view_mode,
      readPermission: board?.read_permission,
      writePermission: board?.write_permission
    }
  );

  const changeExpandState = useCallback(({ id, alwaysOpen }) => {
    setExpandState((prev) => ({ ...prev, [id]: alwaysOpen || !prev[id] }));
  }, []);
  const getExpandImage = useCallback(
    (id) =>
      expandState[id]
        ? require('images/admin/ic-select-arrow-open-focus.svg').default
        : require('images/admin/ic-select-arrow-close-focus.svg').default,
    [expandState]
  );

  const onClickOutside = () => setDropDownState({});

  const onClickAddGroup = () => {
    // Todo - 수정||생성 중인 내용 있으면 팝업 먼저 띄우기
    setNameInputState(IVD.blur);
    if (isBoardGroupLimited) {
      dispatch(showModal({ type: 'warnGroupCount' }));
    }
    onClickAddGroupCallback();
  };
  const onClickAddGroupCallback = () => {
    setAddState({ group: { parent: clubId } });
    setCola({ type: 'group', id: -1, isCreating: true });
  };

  const onChangeGroupActivationLabel = (e) => {
    const _value = e.target.value;
    if (_value === BVD.activation.activation) {
      if (isBoardGroupLimited) {
        if (cola.isCreating || !boardGroup.is_active) {
          confirm('더이상 활성화 불가능');
        } else {
          setActivationLabel(_value);
        }
      } else {
        setActivationLabel(_value);
      }
    } else {
      setActivationLabel(_value);
    }
  };

  const onChangeBoardActivationLabel = (e) => {
    const _value = e.target.value;
    if (_value === BVD.activation.activation) {
      const parentGroupId = cola?.parent;
      if (parentGroupId && getBoardLimited(parentGroupId)) {
        if (board.is_active) {
          setActivationLabel(_value);
        } else {
          confirm('더이상 활성화 불가능');
        }
      } else {
        setActivationLabel(_value);
      }
    } else {
      setActivationLabel(_value);
    }
  };

  const onChangeName = (e, isDifferent) => {
    const _value = e.target.value;
    if (isDifferent) {
      if (_value.length <= 20) {
        setSidebarName(_value);
      }
    } else {
      if (_value.length <= 20) {
        setSidebarName(_value);
        setName(_value);
        nameValidation(_value);
      }
    }
  };
  const onFocusNameInput = () => {
    setNameInputState(IVD.focus);
  };
  const onBlurNameInput = () => {
    nameValidation(name);
  };
  const nameValidation = (_value) => {
    if (_value === '') {
      setNameInputState(IVD.error);
    } else {
      setNameInputState(IVD.success);
    }
  };

  const onClickGroupCancel = () => {
    // 수정중이냐 아니냐가 중요하겠다
    if (cola.isCreating) {
      // Todo -popup 생성 취소 할건지?
      setAddState({});
      setCola({ id: -1, type: '', isCreating: false });
    } else {
      // Todo -popup 수정 취소 할건지?
      // 원래대로 돌리세요
      initBoardGroup(boardGroup);
    }
  };
  const cancelGroupDisabled = !cola.isCreating && !hasGroupChanged;

  const onClickGroupDelete = () => {
    const hasBoard = boardGroups.find((item) => item.id === boardGroup.id)?.boards?.length > 0;
    if (hasBoard) {
      if (confirm('하위에 보드가 있어서 삭제가 불가능 합니다. 병합하시겠습니까?')) {
        onClickMergeGroupButton();
      }
    } else {
      dispatch(openDeleteGroupDialog({ id: boardGroup.id, clubId: clubId }));
    }
  };
  const onClickGroupSave = () => {
    if (cola.isCreating) {
      addGroup();
    } else {
      modifyGroup();
    }
  };
  const addGroup = () => {
    if (name) {
      dispatch(
        postBoardGroupInit({
          id: clubId,
          data: { title: name, is_active: activationLabel === 'Activation' }
        })
      );
      setTimeout(() => {
        dispatch(getBoardGroupsInit({ id: clubId }));
      }, 300);
      setCola({ id: -1, type: '', isCreating: false });
      setAddState({});
    } else {
      setNameInputState(IVD.error);
    }
  };
  const modifyGroup = () => {
    if (name) {
      dispatch(
        patchBoardGroupInit({
          id: boardGroup.id,
          data: { title: name, is_active: activationLabel === 'Activation' },
          actionList: [
            { type: getBoardGroupsInit.type, payload: { id: clubId } },
            { type: getBoardGroupInit.type, payload: { id: boardGroup.id } }
          ]
        })
      );
    } else {
      setNameInputState(IVD.error);
    }
  };
  const saveGroupDisabled = nameInputState === IVD.error || (!hasGroupChanged && !cola.isCreating);

  const onClickBoardCancel = () => {
    // 수정중이냐 아니냐가 중요하겠다
    if (cola.isCreating) {
      // Todo -popup 생성 취소 할건지?
      setAddState({});
      setCola({ id: -1, type: '', isCreating: false });
    } else {
      // Todo -popup 수정 취소 할건지?
      // 원래대로 돌리세요
      initBoard(board);
    }
  };
  const cancelBoardDisabled = !cola.isCreating && !hasBoardChanged;

  const onClickBoardDelete = () => {
    dispatch(getBoardPostsInit({ id: board.id }));
  };
  const onClickBoardSave = () => {
    if (cola.isCreating) {
      addBoard();
    } else {
      modifyBoard();
    }
  };
  const addBoard = () => {
    const _data = {
      title: name,
      is_active: activationLabel === 'Activation',
      description,
      view_mode: viewMode,
      ...permissionToServerData(permission)
    };
    if (name) {
      dispatch(
        postBoardGroupBoardInit({
          id: addState.board?.parent,
          data: _data,
          actionList: [{ type: getBoardGroupsInit.type, payload: { id: clubId } }]
        })
      );
      setAddState({});
    } else {
      setNameInputState(IVD.error);
    }
  };
  const modifyBoard = () => {
    const _data = {
      title: name,
      is_active: activationLabel === 'Activation',
      description,
      view_mode: viewMode,
      ...permissionToServerData(permission)
    };

    if (board.is_active && !_data.is_active) {
      if (confirm('비활성화 하시겠습니까?', '예', '취소')) {
        if (name) {
          dispatch(
            patchBoardInit({
              id: board.id,
              data: _data,
              actionList: [
                { type: getBoardGroupsInit.type, payload: { id: clubId } },
                { type: getBoardInit.type, payload: { id: board.id } }
              ]
            })
          );
        } else {
          setNameInputState(IVD.error);
        }
      }
    } else {
      if (name) {
        dispatch(
          patchBoardInit({
            id: board.id,
            data: _data,
            actionList: [
              { type: getBoardGroupsInit.type, payload: { id: clubId } },
              { type: getBoardInit.type, payload: { id: board.id } }
            ]
          })
        );
      } else {
        setNameInputState(IVD.error);
      }
    }
  };
  const saveBoardDisabled = nameInputState === IVD.error || (!hasBoardChanged && !cola.isCreating);

  const onClickMergeGroupButton = () => {
    const _boardGroups = boardGroups.filter((item) => item.type !== 'DEFAULT' && item.id !== boardGroup.id);
    if (_boardGroups.length > 0) {
      dispatch(openMergeGroupDialog({ id: boardGroup.id, boardGroups: _boardGroups, clubId: clubId }));
    } else {
      confirm('병합할 수 있는 보드그룹이 없습니다.');
    }
  };

  const onClickMergeBoardButton = () => {
    const _boards = boardGroups
      .filter((item) => item.type !== 'DEFAULT')
      .reduce((acc, cur) => [...acc, ...cur.boards], [])
      .filter((item) => item.id !== board.id);

    if (_boards.length > 0) {
      dispatch(openMergeBoardDialog({ id: board.id, boards: _boards, clubId: clubId }));
    } else {
      confirm('병합할 수 있는 보드가 없습니다.');
    }
  };

  useEffect(() => {
    if (boardPosts) {
      if (boardPosts?.length > 0) {
        if (confirm(`하위에 게시물이 있어서 삭제가 불가능 합니다. 병합하시겠습니까?`)) {
          onClickMergeBoardButton();
        }
      } else {
        dispatch(openDeleteBoardDialog({ id: board.id, clubId: clubId }));
      }
    }

    return () => {
      console.log('게시글 초기화');
      dispatch(resetBoardPosts());
    };
  }, [boardPosts]);

  const onDragEnd = (props) => {
    const { destination, draggableId, source, type } = props;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'parent') {
      const id = Number(draggableId);
      const order = boardGroups[destination.index].order;

      // fake loading
      if (source.index < destination.index) {
        // 위에서 밑으로 내릴 때
        dispatch(
          setBoardAdminBoardGroups(
            boardGroups.map((item) =>
              item.id === id ? { ...item, order: order * 2 + 1 } : { ...item, order: item.order * 2 }
            )
          )
        );
      } else {
        // 밑에서 위로 올릴 때
        dispatch(
          setBoardAdminBoardGroups(
            boardGroups.map((item) =>
              item.id === id ? { ...item, order: order * 2 - 1 } : { ...item, order: item.order * 2 }
            )
          )
        );
      }

      dispatch(orderBoardGroupInit({ id, data: { order }, clubId }));
    } else {
      const destBoardGroupId = Number(destination.droppableId);
      const srcBoardGroupId = Number(source.droppableId);

      let ret = [];
      let order;
      const id = Number(draggableId);

      if (destBoardGroupId === srcBoardGroupId) {
        let _boards = boardGroups.find((item) => item.id === destBoardGroupId).boards;

        order = _boards[destination.index].order;
        if (source.index < destination.index) {
          _boards = _boards.map((item) =>
            item.id === id ? { ...item, order: order * 2 + 1 } : { ...item, order: item.order * 2 }
          );
        } else {
          _boards = _boards.map((item) =>
            item.id === id ? { ...item, order: order * 2 - 1 } : { ...item, order: item.order * 2 }
          );
        }
        ret = boardGroups.map((boardGroupItem) =>
          boardGroupItem.id === destBoardGroupId ? { ...boardGroupItem, boards: _boards } : boardGroupItem
        );
      } else {
        const srcBoardGroup = boardGroups.find((item) => item.id === srcBoardGroupId);
        const destBoardGroup = boardGroups.find((item) => item.id === destBoardGroupId);

        const srcBoard = srcBoardGroup.boards.find((item) => item.id === id);
        order = destBoardGroup.boards[destination.index]?.order || 1;

        const srcBoardGroupBoards = srcBoardGroup.boards.filter((item) => item.id !== id);
        const destBoardGroupBoards = [
          ...destBoardGroup.boards.map((item, index) =>
            destination.index <= index ? { ...item, order: item.order + 1 } : item
          ),
          { ...srcBoard, order }
        ];

        ret = boardGroups.map((item) =>
          item.id === destBoardGroupId
            ? { ...destBoardGroup, boards: destBoardGroupBoards }
            : item.id === srcBoardGroupId
            ? { ...srcBoardGroup, boards: srcBoardGroupBoards }
            : item
        );

        // boardGroups
        //   .map((boardGroupItem) =>
        //     boardGroupItem.id === srcBoardGroupId
        //       ? {
        //           ...boardGroupItem,
        //           boards: boardGroupItem.boards.filter((boardItem) => {
        //             if (boardItem.id === id) {
        //               targetBoard = boardItem;
        //               return false;
        //             } else {
        //               return true;
        //             }
        //           })
        //         }
        //       : boardGroupItem
        //   )
        //   .map((boardGroupItem) =>
        //     boardGroupItem.id === destBoardGroupId
        //       ? {
        //           ...boardGroupItem,
        //           boards: [
        //             ...boardGroupItem.boards.map((boardItem, boardIndex) => {
        //               if ((destination.index = boardIndex)) {
        //                 order = boardItem.order;
        //                 return { ...boardItem, order: boardItem.order + 1 };
        //               } else if (destination.index < boardIndex) {
        //                 return { ...boardItem, order: boardItem.order + 1 };
        //               } else {
        //                 return boardItem;
        //               }
        //             })
        //           ].concat({ ...targetBoard, order: order })
        //         }
        //       : boardGroupItem
        //   );
      }
      dispatch(setBoardAdminBoardGroups(ret));
      dispatch(orderBoardInit({ id, data: { order, board_group: destBoardGroupId }, clubId }));
    }
  };

  return (
    <Suspense isLoading={false}>
      <div className="boards">
        <div className="text-h1 boards-title">{BVD.title}</div>
        <div className="text-h4 boards-subtitle">{BVD.subtitle}</div>

        <div className="boards-contents-wrapper">
          <div className="boards-sidebar ">
            <button className="add-group text-h4" onClick={onClickAddGroup}>
              {BVD.addGroup}
            </button>

            <DragDropContext
              onDragEnd={onDragEnd}
              // onDragUpdate={(props) => {
              //   console.log(props);
              // }}
            >
              <Droppable droppableId={'group'} type={'parent'}>
                {(groupDropProvided, snapshot) => (
                  <div ref={groupDropProvided.innerRef} {...groupDropProvided.droppableProps}>
                    {/* 그룹 리스트 시작 */}
                    {_.sortBy(boardGroups, 'order').map((_boardGroup, bgIndex) => {
                      const isDefaultGroup = _boardGroup?.type === 'DEFAULT';
                      const activeGroupClassName = _boardGroup.is_active ? 'active' : 'inactive';

                      const isGroupSelected = cola.type === 'group' && cola.id === _boardGroup.id;
                      const isDropDownActive = dropDownState?.group === _boardGroup.id;
                      const selectedGroupClassName = isGroupSelected || isDropDownActive ? 'selected' : 'none';

                      const onClickGroup = () => {
                        // Todo 입력중인지 분기 처리
                        setAddState({});
                        setCola({ type: 'group', id: _boardGroup.id, isCreating: false });
                      };

                      const onClickExpandImage = (e) => {
                        stopPropagation(e);
                        changeExpandState({ id: _boardGroup.id });
                      };

                      const onClickGroupMore = () => {
                        setDropDownState((prev) => (prev?.group === _boardGroup.id ? {} : { group: _boardGroup.id }));
                      };

                      const renameGroupActive = renameState?.group === _boardGroup.id;
                      const onClickGroupRename = () => {
                        if (isGroupSelected) {
                          setSidebarName(_boardGroup.name);
                          setName(_boardGroup.name);
                        } else {
                          setSidebarName(_boardGroup.name);
                        }
                        setRenameState({ group: _boardGroup.id });
                      };
                      const renameGroup = () => {
                        const _name = isGroupSelected ? name : sidebarName;
                        if (_name) {
                          if (isGroupSelected) {
                            dispatch(
                              patchBoardGroupInit({
                                id: _boardGroup.id,
                                data: { title: _name },
                                actionList: [
                                  { type: getBoardGroupsInit.type, payload: { id: clubId } },
                                  { type: getBoardGroupInit.type, payload: { id: _boardGroup.id } }
                                ]
                              })
                            );
                          } else {
                            dispatch(
                              patchBoardGroupInit({
                                id: _boardGroup.id,
                                data: { title: _name },
                                actionList: [{ type: getBoardGroupsInit.type, payload: { id: clubId } }]
                              })
                            );
                          }
                        } else {
                          if (isGroupSelected) {
                            setName(_boardGroup.name);
                            setNameInputState(IVD.blur);
                          }
                        }
                        setRenameState({});
                      };

                      const onClickGroupActivation = () => {
                        if (_boardGroup.is_active) {
                          dispatch(
                            showModal({
                              type: 'deactiveGroup',
                              data: {
                                boardGroupId: _boardGroup.id,
                                clubId: clubId,
                                isGroupSelected
                              }
                            })
                          );
                        } else {
                          if (isBoardGroupLimited) {
                            dispatch(showModal({ type: 'warnGroupCount' }));
                          } else {
                            dispatch(
                              patchBoardGroupInit({
                                id: _boardGroup.id,
                                data: { is_active: true },
                                actionList: isGroupSelected
                                  ? [
                                      { type: getBoardGroupsInit.type, payload: { id: clubId } },
                                      { type: getBoardGroupInit.type, payload: { id: _boardGroup.id } }
                                    ]
                                  : [{ type: getBoardGroupsInit.type, payload: { id: clubId } }]
                              })
                            );
                          }
                        }
                      };

                      const onClickAddBoard = (e) => {
                        stopPropagation(e);
                        setNameInputState(IVD.blur);
                        // Todo - 수정||생성 중인 내용 있으면 팝업 먼저 띄우기
                        if (_boardGroup.boards.filter((item) => item.is_active).length > 9) {
                          // Todo - popup
                          confirm('보드 10개 이상!');
                          // dispatch(showModal({ type: 'warnGroupCount' }));
                        }
                        setTimeout(() => {
                          setAddState({ board: { parent: _boardGroup.id } });
                          setCola({ type: 'board', id: -1, isCreating: true, parent: _boardGroup.id });
                        }, 0);
                        changeExpandState({ id: _boardGroup.id, alwaysOpen: true });
                      };

                      return (
                        <Draggable key={_boardGroup.id} draggableId={_boardGroup.id.toString()} index={bgIndex}>
                          {(groupDragProvided, groupDragSnapshot) => (
                            <div
                              ref={groupDragProvided.innerRef}
                              {...groupDragProvided.draggableProps}
                              {...groupDragProvided.dragHandleProps}
                            >
                              <Droppable droppableId={_boardGroup.id.toString()}>
                                {(boardDropProvided) => (
                                  <div ref={boardDropProvided.innerRef} {...boardDropProvided.droppableProps}>
                                    {renameGroupActive ? (
                                      <div className="pl-15 pr-15">
                                        <NameSidebarInput
                                          rename={renameGroup}
                                          placeholder={BVD.addPlaceholder.board}
                                          value={sidebarName}
                                          onChange={(e) => onChangeName(e, !isGroupSelected)}
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className={`gp-name text-h5 gp-name-${selectedGroupClassName} gp-name-${selectedGroupClassName}`}
                                        onClick={onClickGroup}
                                        style={groupDragSnapshot.isDragging ? { backgroundColor: '#ededed' } : {}}
                                      >
                                        <img
                                          className="expand-image"
                                          src={getExpandImage(_boardGroup.id)}
                                          onClick={onClickExpandImage}
                                        />
                                        <div className={`gp-name-text gp-name-text-${activeGroupClassName}`}>
                                          {_boardGroup.name}
                                        </div>
                                        {!isDefaultGroup && (
                                          <MoreOptionButton
                                            onClick={onClickGroupMore}
                                            onClickOutside={onClickOutside}
                                            menuList={[
                                              { label: BVD.dropdown.rename, onClick: onClickGroupRename },
                                              {
                                                label: BVD.dropdown.active(_boardGroup.is_active),
                                                onClick: onClickGroupActivation
                                              }
                                            ]}
                                          />
                                        )}
                                        <AddButton selected={isDropDownActive} onClick={onClickAddBoard} />
                                      </div>
                                    )}

                                    {/* board list */}
                                    {expandState[_boardGroup.id] &&
                                      _.sortBy(_boardGroup.boards, 'order').map((_board, boardIndex) => {
                                        const boardType =
                                          _board.type === 'ALL' || _board.type === 'NOTICE' || _board.type === 'EVENT'
                                            ? 'default'
                                            : _board.type === 'VIDEO' || _board.type === 'GALLERY'
                                            ? 'media'
                                            : 'none';
                                        const activeBoardClassName = _board.is_active ? 'active' : 'inactive';
                                        const isBoardSelected = cola.type === 'board' && cola.id === _board.id;
                                        const isBoardActive = dropDownState?.board === _board.id;
                                        const selectedBoardClassName =
                                          isBoardSelected || isBoardActive ? 'selected' : 'none';

                                        const onClickBoard = () => {
                                          // Todo 생성||수정 중인거 있는지 & 있으면 팝업 없으면 바로 클릭
                                          setAddState({});
                                          setCola({
                                            type: 'board',
                                            id: _board.id,
                                            isCreating: false,
                                            parent: _boardGroup.id
                                          });
                                        };
                                        const onClickBoardMore = () => {
                                          setDropDownState((prev) =>
                                            prev?.board === _board.id ? {} : { board: _board.id }
                                          );
                                        };

                                        const renameBoardActive = renameState?.board === _board.id;
                                        const onClickBoardRename = () => {
                                          if (isBoardSelected) {
                                            setSidebarName(_board.name);
                                            setName(_board.name);
                                          } else {
                                            setSidebarName(_board.name);
                                          }
                                          setRenameState({ board: _board.id });
                                        };
                                        const renameBoard = () => {
                                          const _name = isBoardSelected ? name : sidebarName;
                                          if (_name) {
                                            if (isBoardSelected) {
                                              dispatch(
                                                patchBoardInit({
                                                  id: _board.id,
                                                  data: { title: _name },
                                                  actionList: [
                                                    { type: getBoardGroupsInit.type, payload: { id: clubId } },
                                                    { type: getBoardInit.type, payload: { id: _board.id } }
                                                  ]
                                                })
                                              );
                                            } else {
                                              dispatch(
                                                patchBoardInit({
                                                  id: _board.id,
                                                  data: { title: _name },
                                                  actionList: [
                                                    { type: getBoardGroupsInit.type, payload: { id: clubId } }
                                                  ]
                                                })
                                              );
                                            }
                                          } else {
                                            if (isBoardSelected) {
                                              setName(_board.name);
                                              setNameInputState(IVD.blur);
                                            }
                                          }
                                          setRenameState({});
                                        };
                                        const onClickBoardActivation = () => {
                                          if (!_board.is_active) {
                                            if (getBoardLimited(_boardGroup.id)) {
                                              confirm('더이상 활성화가 불가능합니다');
                                            } else {
                                              // Todo - popup 10개 개수
                                              if (confirm('활성화 하시겠습니까?', 'ok', 'cancel')) {
                                                if (isBoardSelected) {
                                                  dispatch(
                                                    patchBoardInit({
                                                      id: _board.id,
                                                      data: { is_active: !_board.is_active },
                                                      actionList: [
                                                        { type: getBoardGroupsInit.type, payload: { id: clubId } },
                                                        { type: getBoardInit.type, payload: { id: _board.id } }
                                                      ]
                                                    })
                                                  );
                                                } else {
                                                  dispatch(
                                                    patchBoardInit({
                                                      id: _board.id,
                                                      data: { is_active: !_board.is_active },
                                                      actionList: [
                                                        { type: getBoardGroupsInit.type, payload: { id: clubId } }
                                                      ]
                                                    })
                                                  );
                                                }
                                              }
                                            }
                                          } else {
                                            // Todo - popup 10개 개수
                                            if (confirm('비활성화 하시겠습니까?', 'ok', 'cancel')) {
                                              if (isBoardSelected) {
                                                dispatch(
                                                  patchBoardInit({
                                                    id: _board.id,
                                                    data: { is_active: !_board.is_active },
                                                    actionList: [
                                                      { type: getBoardGroupsInit.type, payload: { id: clubId } },
                                                      { type: getBoardInit.type, payload: { id: _board.id } }
                                                    ]
                                                  })
                                                );
                                              } else {
                                                dispatch(
                                                  patchBoardInit({
                                                    id: _board.id,
                                                    data: { is_active: !_board.is_active },
                                                    actionList: [
                                                      { type: getBoardGroupsInit.type, payload: { id: clubId } }
                                                    ]
                                                  })
                                                );
                                              }
                                            }
                                          }
                                        };

                                        const menuList =
                                          boardType === 'media'
                                            ? [
                                                {
                                                  label: BVD.dropdown.active(_board.is_active),
                                                  onClick: onClickBoardActivation
                                                }
                                              ]
                                            : [
                                                { label: BVD.dropdown.rename, onClick: onClickBoardRename },
                                                {
                                                  label: BVD.dropdown.active(_board.is_active),
                                                  onClick: onClickBoardActivation
                                                }
                                              ];
                                        return (
                                          <Draggable
                                            key={_board.id}
                                            draggableId={_board.id.toString()}
                                            index={boardIndex}
                                          >
                                            {(boardDragProvided, boardDragSnapshot) => (
                                              <div
                                                ref={boardDragProvided.innerRef}
                                                {...boardDragProvided.draggableProps}
                                                {...boardDragProvided.dragHandleProps}
                                              >
                                                {renameBoardActive ? (
                                                  <div className="pl-30 pr-15">
                                                    <NameSidebarInput
                                                      rename={renameBoard}
                                                      placeholder={BVD.addPlaceholder.board}
                                                      value={sidebarName}
                                                      onChange={(e) => onChangeName(e, !isBoardSelected)}
                                                    />
                                                  </div>
                                                ) : (
                                                  <div
                                                    className={`bd-name text-h6 bd-name-${selectedBoardClassName} bd-name-${selectedBoardClassName}`}
                                                    onClick={onClickBoard}
                                                    style={
                                                      boardDragSnapshot.isDragging ? { backgroundColor: '#ededed' } : {}
                                                    }
                                                  >
                                                    <div
                                                      className={`bd-name-text bd-name-text-${activeBoardClassName}`}
                                                    >
                                                      {_board.name}
                                                    </div>
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
                                            )}
                                          </Draggable>
                                        );
                                      })}
                                    {boardDropProvided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              {/* board 추가하는 text input */}
                              {addState?.board?.parent === _boardGroup.id && (
                                <div className="pl-30 pr-15">
                                  <NameSidebarInput
                                    placeholder={BVD.addPlaceholder.board}
                                    value={sidebarName}
                                    onChange={onChangeName}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {groupDropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {addState?.group && (
              <div className="pl-15 pr-15">
                <NameSidebarInput
                  placeholder={BVD.addPlaceholder.boardGroup}
                  value={sidebarName}
                  onChange={onChangeName}
                />
              </div>
            )}
          </div>

          {!cola.type ? (
            <div className="boards-content-init">{BVD.initText}</div>
          ) : cola.type === 'group' ? (
            <div>
              <div className="boards-contents ">
                <ActivationInput
                  activationLabel={activationLabel}
                  onChange={onChangeGroupActivationLabel}
                  disabled={!cola.isCreating && boardGroup?.type === 'DEFAULT'}
                />
                <NameInput
                  name={name}
                  onChange={onChangeName}
                  disabled={!cola.isCreating && boardGroup?.type === 'DEFAULT'}
                  inputState={nameInputState}
                  onBlur={onBlurNameInput}
                  onFocus={onFocusNameInput}
                />
                {!cola.isCreating && getType(true, boardGroup?.type) !== 'default' && (
                  <div className="boards-contents-merge">
                    <button onClick={onClickMergeGroupButton}>MERGING</button>
                  </div>
                )}
              </div>
              <Submit
                isDefault={boardGroup?.type === 'DEFAULT'}
                onClickCancel={onClickGroupCancel}
                cancelDisabled={cancelGroupDisabled}
                onClickDelete={onClickGroupDelete}
                onClickSave={onClickGroupSave}
                saveDisabled={saveGroupDisabled}
              />
            </div>
          ) : (
            <div>
              <div className="boards-contents ">
                <ActivationInput
                  activationLabel={activationLabel}
                  onChange={onChangeBoardActivationLabel}
                  disabled={!cola.isCreating && getType(false, board?.type) === 'default'}
                />
                <NameInput
                  name={name}
                  onChange={onChangeName}
                  disabled={!cola.isCreating && getType(false, board?.type) !== 'normal'}
                  inputState={nameInputState}
                  onBlur={onBlurNameInput}
                  onFocus={onFocusNameInput}
                />

                <DescriptionInput description={description} onChange={setDescription} />
                <PermissionInput
                  permission={permission}
                  onChange={(permission) => setPermission((prev) => ({ ...prev, ...permission }))}
                  boardType={getType(false, board?.type)}
                />
                <ViewModeInput viewMode={viewMode} onChange={setViewMode} />
                {!cola.isCreating && getType(false, board?.type) === 'normal' && (
                  <div className="boards-contents-merge">
                    <button onClick={onClickMergeBoardButton}>MERGING</button>
                  </div>
                )}
              </div>

              <Submit
                isDefault={!cola.isCreating && getType(false, board?.type) !== 'normal'}
                onClickCancel={onClickBoardCancel}
                cancelDisabled={cancelBoardDisabled}
                onClickDelete={onClickBoardDelete}
                onClickSave={onClickBoardSave}
                saveDisabled={saveBoardDisabled}
              />
            </div>
          )}
        </div>

        <ActiveGroupModal />
        <ActiveBoardModal />
        <DeactiveGroupModal />
        <DeactiveBoardModal />
        <WarnGroupCountModal />
        <WarnBoardCountModal />

        <MergeGroupDialog submit={() => setCola(initialColaState)} />
        <MergeBoardDialog submit={() => setCola(initialColaState)} />
        <DeleteGroupDialog submit={() => setCola(initialColaState)} />
        <DeleteBoardDialog submit={() => setCola(initialColaState)} />
      </div>
    </Suspense>
  );
};

export default Boards;

const NameSidebarInput = ({ value, onChange, rename = () => {}, placeholder }) => (
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
    onBlur={rename}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        rename();
      }
    }}
  />
);

export const BVD = {
  title: 'Boards Management',
  subtitle: "Create and edit your club's bulletin boards for members to have fun discussing topics!",
  addGroup: '+ ADD GROUP',

  initText: 'Please select a board from the left sidebar',
  addPlaceholder: {
    boardGroup: 'Please enter a board group name',
    board: 'Please enter a board name'
  },
  activation: {
    title: 'Activation',
    subtitle: 'If disable the board, cannot access this board.',
    list: ['Activation', 'Deactivation'],
    activation: 'Activation',
    deactivation: 'Deactivation'
  },
  name: {
    title: 'Name',
    placeholder: 'Please name a board',
    error: 'Please enter a board name.'
  },
  description: {
    title: 'Description',
    placeholder: 'Please write a board description'
  },
  permission: {
    title: 'Permissions',
    subtitle: 'The permission to view a post cannot be greater than the permission to create a post.',
    read: 'Read',
    readGrade: 'Read Grade',
    readGradeUnderText: (grade) => `Can read ${grade} or higher.`,
    write: 'Write',
    writeGrade: 'Write Grade',
    writeGradeUnderText: (grade) => `Can write ${grade} or higher.`,
    staffList: [
      { key: 'GUEST', label: 'Guest', tier: 0 },
      { key: 'MEMBER', label: 'Member', tier: 1 },
      { key: 'STAFF', label: 'Staff', tier: 8 }
    ],
    staff: {
      GUEST: 'GUEST',
      MEMBER: 'MEMBER',
      STAFF: 'STAFF'
    },
    gradeList: [
      { key: 'BRONZE', label: 'Bronze', tier: 2 },
      { key: 'SILVER', label: 'Silver', tier: 3 },
      { key: 'GOLD', label: 'Gold', tier: 4 },
      { key: 'PLATINUM', label: 'Platinum', tier: 5 },
      { key: 'DIAMOND', label: 'Diamond', tier: 6 },
      { key: 'LEGEND', label: 'Legend', tier: 7 }
    ],
    grade: {
      BRONZE: 'BRONZE',
      SILVER: 'SILVER',
      GOLD: 'GOLD',
      PLATINUM: 'PLATINUM',
      DIAMOND: 'DIAMOND',
      LEGEND: 'LEGEND'
    },
    apiList: [
      { type: 'GUEST', value: 0 },
      { type: 'BRONZE', value: 1 },
      { type: 'SILVER', value: 2 },
      { type: 'GOLD', value: 3 },
      { type: 'PLATINUM', value: 4 },
      { type: 'DIAMOND', value: 5 },
      { type: 'LEGEND', value: 6 },
      { type: 'STAFF', value: 7 },
      { type: 'PRO_STAFF', value: 8 },
      { type: 'SUPER_STAFF', value: 9 },
      { type: 'MASTER', value: 10 }
    ]
  },
  viewMode: {
    title: 'View mode',
    subtitle: 'You can set up your board in any format.',
    // album: {
    //   key: 'ALBUM_TYPE',
    //   title: 'Album type',
    //   subtitle: 'Can view many images of the posts like a gallery',
    //   defaultImage: require('images/admin/board/type_album_default.svg').default,
    //   activeImage: require('images/admin/board/type_album_active.svg').default
    // },
    // list: {
    //   key: 'LIST_TYPE',
    //   title: 'List type',
    //   subtitle: 'Can view summaries of many posts like a blog',
    //   defaultImage: require('images/admin/board/type_list_default.svg').default,
    //   activeImage: require('images/admin/board/type_list_active.svg').default
    // },
    // card: {
    //   key: 'CARD_TYPE',
    //   title: 'Card type',
    //   subtitle: 'Can view post one by one larger like SNS',
    //   defaultImage: require('images/admin/board/type_card_default.svg').default,
    //   activeImage: require('images/admin/board/type_card_active.svg').default
    // },
    type: {
      album: 'ALBUM_TYPE',
      list: 'LIST_TYPE',
      card: 'CARD_TYPE'
    },
    list: [
      {
        key: 'ALBUM_TYPE',
        title: 'Album type',
        subtitle: 'Can view many images of the posts like a gallery',
        defaultImage: require('images/admin/board/type_album_default.svg').default,
        activeImage: require('images/admin/board/type_album_active.svg').default
      },
      {
        key: 'LIST_TYPE',
        title: 'List type',
        subtitle: 'Can view summaries of many posts like a blog',
        defaultImage: require('images/admin/board/type_list_default.svg').default,
        activeImage: require('images/admin/board/type_list_active.svg').default
      },
      {
        key: 'CARD_TYPE',
        title: 'Card type',
        subtitle: 'Can view post one by one larger like SNS',
        defaultImage: require('images/admin/board/type_card_default.svg').default,
        activeImage: require('images/admin/board/type_card_active.svg').default
      }
    ]
  },
  dropdown: {
    rename: 'Rename',
    active: (isActive) => (isActive ? 'Deactivate' : 'Activation')
  },
  modalText: {
    deleteGroup: 'Are you sure you want to delete the group?',
    deleteBoard: 'Are you sure you want to delete the board?',
    cancelEdit: "Are you sure you want to cancel the edits you've made so far?",
    mergeBoard: 'Which bulletin board do you want to move the posts in the bulletin board to?',
    deactivationList: ['Are you sure you want to disable it?', '(User cannot see the board)'],
    warnBoardCountList: ['Groups cannot be more than 10 active.', '(Please deactivate or merge the existing group.)'],
    warnGroupCountList: ['Boards cannot be more than 10 active.', '(Disable or merge existing boards.)']
  },

  dialogText: {
    mergeBoard: {
      title: 'Are you want to merge the board?',
      subtitle: 'Select another board to move posts on this board.'
    },
    mergeGroup: { title: 'Are you want to merge the groups?' }
  }
};
