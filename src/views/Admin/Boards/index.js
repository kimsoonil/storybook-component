import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { getClubBoardGroupsInit, postClubBoardGroupInit } from 'redux/idistStore/clubSlice';

import { Loader } from 'components/idist/Loader';
import _ from 'lodash';
import BoardInfo from './BoardInfo';
import BoardGroupInfo from './BoardGroupInfo';
import { postBoardGroupBoardInit } from 'redux/idistStore/boardGroupSlice';
import BoardSidebar from './BoardSidebar';
import { setAdminBoards } from 'redux/idistStore/adminSlice';

const Boards = () => {
  const dispatch = useDispatch();
  // 이거 사용할 것
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 42;

  // const clubState = useSelector((state) => state.club);
  // const boardGroupState = useSelector((state) => state.boardGroup);

  const selected = useSelector((state) => state.admin?.boards?.selected);
  // cosnt [selected, setSelected] = useState({id: -1, type: -1})

  return (
    <div className="boards">
      <div className="text-h1 boards-title">{BVD.title}</div>
      <div className="text-h4 boards-subtitle">{BVD.subTitle}</div>

      <div className="boards-contents-wrapper">
        {/* <BoardSidebar clubId={clubId} selected={selected} setSelected={setSelected} /> */}
        <BoardSidebar clubId={clubId} selected={selected} />

        {selected.id < 0 ? (
          <div className="boards-content-init">{BVD.initText}</div>
        ) : selected.type === 0 ? (
          <BoardGroupInfo />
        ) : (
          <BoardInfo />
        )}
      </div>
    </div>
  );
};

export default Boards;

export const BVD = {
  title: 'Boards Management',
  subTitle: "Create and edit your club's bulletin boards for members to have fun discussing topics!",
  addGroup: '+ ADD GROUP',

  initText: 'Please select a board from the left sidebar',
  addPlaceholder: {
    boardGroup: 'Please enter a board group name',
    board: 'Please enter a board name'
  },
  activation: {
    title: 'Activation',
    subtitle: 'If disable the board, cannot access this board.',
    list: [
      { isActive: true, label: 'Activation' },
      { isActive: false, label: 'Deactivation' }
    ]
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
    readGradeUnder: (grade) => `Can read ${grade} or higher.`,
    write: 'Write',
    writeGrade: 'Write Grade',
    writeGradeUnder: (grade) => `Can write ${grade} or higher.`,
    staffList: [
      { key: 'GUEST', label: 'Guest' },
      { key: 'MASTER', label: 'Master' },
      { key: 'STAFF', label: 'Staff' }
    ],
    levelList: [
      { key: 'BRONZE', label: 'Bronze' },
      { key: 'SILVER', label: 'Silver' },
      { key: 'GOLD', label: 'Gold' },
      { key: 'PLATINUM', label: 'Platinum' },
      { key: 'DIAMOND', label: 'Diamond' },
      { key: 'LEGEND', label: 'Legend' }
    ]
  },
  viewMode: {
    title: 'View mode',
    subtitle: 'You can set up your board in any format.',
    album: {
      title: 'Album type',
      subtitle: 'Can view many images of the posts like a gallery',
      defaultImage: require('images/admin/board/type_album_default.svg').default,
      activeImage: require('images/admin/board/type_album_active.svg').default
    },
    list: {
      title: 'List type',
      subtitle: 'Can view summaries of many posts like a blog',
      defaultImage: require('images/admin/board/type_list_default.svg').default,
      activeImage: require('images/admin/board/type_list_active.svg').default
    },
    card: {
      title: 'Card type',
      subtitle: 'Can view post one by one larger like SNS',
      defaultImage: require('images/admin/board/type_card_default.svg').default,
      activeImage: require('images/admin/board/type_card_active.svg').default
    }
  }
};
