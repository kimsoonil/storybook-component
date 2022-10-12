import React, { useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/posts.scss';
// import { useOutletContext } from 'react-router';
// import { DataGrid } from '@mui/x-data-grid';
// import PostTable from './PostTable';

import JCheckbox from 'components/idist/admin/JCheckbox';
import PostRow from 'views/Admin/Posts/PostRow';
import PostColumn from 'views/Admin/Posts/PostColumn';
import Profile from 'components/idist/admin/posts/Profile';
import ActiveSwitch from 'components/idist/admin/posts/ActiveSwitch';
import ReportCount from 'components/idist/admin/posts/ReportCount';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useOutletContext } from 'react-router';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import { getPostsInit, switchActivatePostInit } from 'redux/idistStore/admin/postAdminSlice';
import { toCamelCase, toSnakeCase } from 'utils';
import BoardName from 'components/idist/admin/posts/BoardName';
import PostTitle from 'components/idist/admin/posts/PostTitle';
import PostTable from './PostTable';
import { dateCalculation } from 'utils/dateCalculation';
import { format } from 'date-fns';

const Posts = () => {
  const dispatch = useDispatch();
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;
  // // 클럽 보드 목록 가져오고,
  const boardGroups = useSelector((state) => state.boardAdmin.boardGroups);
  const posts = useSelector((state) => state.postAdmin.posts);

  const [rows, setRows] = useState([]);

  const [checkedPosts, setCheckedPosts] = useState([]);
  const checkedAll = useMemo(() => rows.length > 0 && checkedPosts.length === rows.length, [checkedPosts, rows]);
  const checkedIndeterminate = useMemo(() => checkedPosts.length > 0, [checkedPosts]);

  const [boardSelector, setBoardSelector] = useState('');
  const [activateSelector, setActivateSelector] = useState('all');
  const [sortState, setSortState] = useState({ field: '', type: '' });

  /**
   * board : [id],
   * is_active : boolean,
   * ordering: '-report_count', '-created', '-report_date'
   */
  const params = useMemo(() => {
    const ret = {};

    if (boardSelector) {
      ret.board = Number(boardSelector);
    }

    if (activateSelector !== 'all') {
      if (activateSelector === 'activate') {
        ret.is_active = true;
      } else if (activateSelector === 'deactivate') {
        ret.is_active = false;
      }
    }

    if (sortState?.field) {
      const _sortState = toSnakeCase(sortState.field);
      ret.ordering = sortState.type === 'ascending' ? _sortState : '-' + _sortState;
    }

    return ret;
  }, [activateSelector, boardSelector, sortState]);

  useEffect(() => {
    if (boardGroups.length < 1) {
      dispatch(getBoardGroupsInit({ id: clubId }));
    }
    return () => {};
  }, [boardGroups]);

  useEffect(() => {
    dispatch(getPostsInit({ id: clubId, params }));
  }, [params]);

  useEffect(() => {
    setRows(posts.map((item) => toCamelCase({ ...item, created: format(new Date(item.created), 'yyyy.MM.dd HH:mm') })));
  }, [posts]);

  const handleActivateButton = (idList, isActive) => {
    dispatch(switchActivatePostInit({ data: { id: idList, isActive } }));
    setCheckedPosts([]);
    setRows((prev) => prev.map((item) => (idList.includes(item.id) ? { ...item, isActive } : item)));
  };

  const handleCheckBox = (checked, indeterminate) => {
    if (checked || indeterminate) {
      setCheckedPosts([]);
    } else {
      setCheckedPosts(rows.map((item) => item.id));
    }
  };

  const handleRowCheckBox = (id) => {
    if (checkedPosts.includes(id)) {
      setCheckedPosts((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedPosts((prev) => [...prev, id]);
    }
  };

  const handleRowActivateSwitch = (rowId, isActive) => {
    dispatch(switchActivatePostInit({ data: { id: [rowId], isActive } }));
    setRows((prev) => prev.map((item) => (item.id === rowId ? { ...item, isActive } : item)));
  };

  const handleSort = ({ field, type }) => {
    setSortState((prev) => {
      if (prev.field === field && prev.type === type) {
        return { field: '', type: '' };
      } else {
        return { field, type };
      }
    });
  };

  const onClickBoardName = (id) => {
    confirm(`board id : ${id}`);
  };

  const onClickReportCount = () => {};

  const columns = useMemo(
    () => [
      {
        field: 'boardName',
        name: 'Board',
        columnStyle: { width: '150px' },
        Component: (props) => <BoardName {...props} onClick={onClickBoardName} />
      },
      {
        field: 'title',
        name: 'Title',
        columnStyle: { width: '350px' },
        Component: (props) => <PostTitle {...props} />
      },
      {
        field: 'writer',
        name: 'Writer',
        columnStyle: { width: '150px' },
        Component: (props) => <Profile {...props} />
      },
      {
        field: 'created',
        name: 'Data Created',
        columnStyle: { width: '150px', display: 'flex', justifyContent: 'center' },
        sorting: true
      },
      {
        field: 'isActive',
        name: 'Deactivate',
        columnStyle: { width: '204px', display: 'flex', justifyContent: 'center' },
        Component: (props) => <ActiveSwitch onChange={handleRowActivateSwitch} {...props} />
      },
      {
        field: 'reportCount',
        name: 'Number of reports',
        columnStyle: { width: '150px', display: 'flex', justifyContent: 'center' },
        sorting: true,
        Component: (props) => <ReportCount onClickReportCount={onClickReportCount} {...props} />
      }
    ],
    []
  );

  return (
    <div className="admin-post">
      <div className="text-h1 admin-post-title">{PVD.title}</div>
      <div className="text-h4 admin-post-subtitle">{PVD.subtitle}</div>

      <div className="post-table-layout">
        <div className="post-table-filter-wrapper">
          <select className="post-table-filter-selector" onChange={(e) => setActivateSelector(e.target.value)}>
            <option value={'all'}>All</option>
            <option value={'activate'}>Activate</option>
            <option value={'deactivate'}>Deactivate</option>
          </select>

          <button className="post-table-filter-advanced-button" onClick={() => confirm('고급 필터')}></button>
        </div>

        <div className="post-table-header">
          <select className="post-table-header-board-selector" onChange={(e) => setBoardSelector(e.target.value)}>
            <option value={''}>All Board</option>
            {boardGroups &&
              boardGroups.map(({ name, boards }, index1) => (
                <optgroup key={name + index1} label={`${name}`}>
                  {boards.map(({ name: boardName, id }, index2) => (
                    <option key={boardName + index2} value={id}>
                      {boardName}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>

          <div className="post-table-header-button-wrapper">
            <button className="active-button" onClick={() => handleActivateButton(checkedPosts, true)}>
              Active
            </button>
            <button className="deactive-button" onClick={() => handleActivateButton(checkedPosts, false)}>
              Deactive
            </button>
          </div>
        </div>

        <PostTable
          columns={columns}
          rows={rows}
          checkboxSelection={true}
          checked={checkedAll}
          indeterminate={checkedIndeterminate}
          checkedList={checkedPosts}
          onClickCheckBox={handleCheckBox}
          onClickRowCheckbox={handleRowCheckBox}
          sortState={sortState}
          onClickSortButton={handleSort}
        />

        <div className="post-table-header" />
      </div>
    </div>
  );
};

export default Posts;

export const PVD = {
  title: 'Posts Management',
  subtitle: 'Posts are not visible to other members when deactivated.'
};

const reportedPosts = [
  {
    id: 0,
    board: 'Twice',
    title: `'NAYEON's picture today 😻`,
    writer: 'Hot six',
    created: '2022.09.05',
    deactive: true,
    reportCount: 4
  },
  {
    id: 1,
    board: 'Notice',
    title: `도지 코인은 떡상한다 (.feat 도지코인 개같이 부활)`,
    writer: 'Elon musk',
    created: '2022.09.22',
    deactive: true,
    reportCount: 999
  },
  {
    id: 2,
    board: 'Coin',
    title: `NFT의 미래`,
    writer: 'Jack Dorsey',
    created: '2022.09.01',
    deactive: true,
    reportCount: 12
  },
  {
    id: 3,
    board: 'Crypto',
    title: `1 사토시 = 10원 의 시대`,
    writer: 'Satoshi Nakamoto',
    created: '2023.09.05',
    deactive: true,
    reportCount: 4
  }
];
