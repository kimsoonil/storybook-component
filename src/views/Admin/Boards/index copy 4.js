import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { getClubBoardGroupsInit, postClubBoardGroupInit } from 'redux/idistStore/clubSlice';
import {
  deleteBoardGroupInit,
  getBoardGroupInit,
  patchBoardGroupInit,
  postBoardGroupBoardInit
} from 'redux/idistStore/boardGroupSlice';
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
import Suspense from 'components/idist/admin/Suspense';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';

const Boards = () => {
  const dispatch = useDispatch();
  // 이거 사용할 것
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;

  const boardGroups = useSelector((state) => state.boardAdmin.boardGroups);
  const selected = useSelector((state) => state.boardAdmin.selected);
  useEffect(() => {
    dispatch(getBoardGroupsInit({ id: clubId }));
  }, [clubId, selected]);

  const [expandState, setExpandState] = useState({});
  const [dropDownState, setDropDownState] = useState({}); // {group: [groupID, ...], board: [boardID, ...]}
  const [addState, setAddState] = useState({ group: false, board: false });
  const [renameState, setRenameState] = useState({ group: false, board: false });

  /**
   * 화면에 뿌리는 것은 useState, 서버를 통하는 것은 리덕스로!
   */

  const [boardGroup, setBoardGroup] = useState({ name: '', activationLabel: BVD.activation.activation });
  const [board, setBoard] = useState({
    name: '',
    activationLabel: BVD.activation.activation,
    description: '',
    read: BVD.permission.staff.GUEST,
    write: BVD.permission.staff.GUEST,
    readGrade: BVD.permission.grade.BRONZE,
    writeGrade: BVD.permission.grade.BRONZE,
    viewMode: BVD.viewMode.type.list
  });

  return (
    <Suspense isLoading={false}>
      <div className="boards">
        <div className="text-h1 boards-title">{BVD.title}</div>
        <div className="text-h4 boards-subtitle">{BVD.subtitle}</div>

        <div className="boards-contents-wrapper">
          <div className="boards-sidebar ">
            <button className="add-group text-h4" onClick={() => {}}>
              {BVD.addGroup}
            </button>
          </div>
        </div>
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
