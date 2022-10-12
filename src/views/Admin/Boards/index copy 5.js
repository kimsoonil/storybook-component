import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import Suspense from 'components/idist/admin/Suspense';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import BoardGroupItem from 'components/idist/admin/boards/BoardGroupItem';
import BoardItem from 'components/idist/admin/boards/BoardItem';
import BoardSidebarNameInput from 'components/idist/admin/boards/BoardSidebarNameInput';
import ActivationInput from './Info/ActivationInput';
import NameInput from './Info/NameInput';
import Submit from './Info/Submit';
import BoardGroupDetail from 'components/idist/admin/boards/BoardGroupDetail';

const Boards = () => {
  const dispatch = useDispatch();
  // 이거 사용할 것
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;

  const boardGroups = useSelector((state) => state.boardAdmin.boardGroups);
  const selected = useSelector((state) => state.boardAdmin.selected);

  const [addState, setAddState] = useState(false); // group: true, board: [id]
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getBoardGroupsInit({ id: clubId }));
  }, [clubId, selected]);

  return (
    <Suspense isLoading={false}>
      <div className="boards">
        <div className="text-h1 boards-title">{BVD.title}</div>
        <div className="text-h4 boards-subtitle">{BVD.subtitle}</div>

        <div className="boards-contents-wrapper">
          <div className="boards-sidebar ">
            <button className="add-group text-h4" onClick={() => setAddState({ group: true })}>
              {BVD.addGroup}
            </button>

            {_.sortBy(boardGroups, 'order').map((_boardGroup, index) => {
              return (
                <BoardGroupItem key={index} boardGroup={_boardGroup} addState={addState} setAddState={setAddState}>
                  {_.sortBy(_boardGroup.boards, 'order').map((_board, index) => {
                    return <BoardItem key={index} board={_board} />;
                  })}
                </BoardGroupItem>
              );
            })}
            {addState?.group && (
              <div className="pl-15 pr-15">
                <BoardSidebarNameInput
                  placeholder={BVD.addPlaceholder.boardGroup}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
          </div>

          <>
            {!selected?.contentsType ? (
              <div className="boards-content-init">{BVD.initText}</div>
            ) : selected.contentsType === 'group' ? (
              <BoardGroupDetail />
            ) : selected.contentsType === 'board' ? (
              <div>
                {/* <div className="boards-contents ">
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
                /> */}
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </Suspense>
  );
};

export default Boards;

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
