/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/reports.scss';

import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import AdminTable from 'components/idist/admin/datatable/AdminTable';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import JButton from 'components/idist/admin/JButton';
import BoardName from 'components/idist/admin/reports/BoardName';
import Profile from 'components/idist/admin/reports/Profile';
import ContentTitle from 'components/idist/admin/reports/ContentTitle';
import ReportCount from 'components/idist/admin/reports/ReportCount';
import ActivationSwitch from 'components/idist/admin/reports/ActivationSwitch';
import { openContentsActivationDialog } from 'redux/idistStore/admin/dialogSlice';
import ContentsActivationDialog from 'components/idist/admin/reports/ContentsActivationDialog';
import ReportHistoryDialog from 'components/idist/admin/reports/ReportHistoryDialog';

function Reports() {
  const dispatch = useDispatch();
  const { id: clubId = -1 } = useSelector((state) => state.commonAdmin.club);

  const [searchWord, setSearchWord] = useState('');

  const boardGroups = useSelector((state) => state.boardAdmin.boardGroups);

  const [boardGroupId, setBoardGroupId] = useState(-1);
  const boards = useMemo(
    () => boardGroups.find((item) => item.id === boardGroupId)?.boards || [],
    [boardGroups, boardGroupId]
  );
  const [boardId, setBoardId] = useState(-1);

  const [type, setType] = useState('');
  const [activation, setActivation] = useState('');

  const searchButtonDisabled = useMemo(
    () => !searchWord && boardGroupId === -1 && boardId === -1 && !type && !activation,
    [searchWord, boardGroupId, boardId, type, activation]
  );

  const [sortState, setSortState] = useState({ field: '', step: 0 });

  const tmpRowData = [
    {
      id: 237,
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'Kate',
        staff: true
      },
      board: {
        id: 17,
        name: 'Community'
      },
      type: 'Comment',
      content: { id: 34, text: `NAYEON's picture today 😻` },
      reportCount: 4,
      activation: true,
      staff: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'Jerry',
        staff: true
      },
      reason: 'Breaks rules',
      reportedDate: '2022.10.01 21:22'
    },
    {
      id: 280,
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'Kate',
        staff: true
      },
      board: {
        id: 17,
        name: 'Community'
      },
      type: 'Post',
      content: { id: 43, text: `Precautions` },
      reportCount: 2,
      activation: false,
      staff: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'Jerry',
        staff: true
      },
      reason: 'Breaks rules',
      reportedDate: '2022.10.01 21:22'
    }
  ];

  const [rows, setRows] = useState(tmpRowData.concat(tmpRowData).concat(tmpRowData));

  useEffect(() => {
    dispatch(getBoardGroupsInit({ id: clubId }));
  }, []);

  const onClickSortButton = useCallback(({ field }) => {
    setSortState((prev) => (prev.field === field ? { field, step: (prev.step + 1) % 3 } : { field, step: 1 }));
  }, []);

  const handleActivationSwitch = (id) => {
    setRows((prev) => prev.map((item) => (item.id === id ? { ...item, activation: !item.activation } : item)));
  };

  const columns = useMemo(
    () => [
      {
        field: 'id',
        name: 'Report ID',
        width: 150
      },
      {
        field: 'reporter',
        name: 'Reporter',
        width: 150,
        RowComponents: (props) => <Profile user={props.reporter} />
      },
      {
        field: 'board',
        name: 'Board',
        width: 150,
        RowComponents: (props) => <BoardName board={props.board} onClick={(id) => confirm(`${id} 보드로 이동`)} />
      },
      {
        field: 'type',
        name: 'Type',
        width: 150
      },
      {
        field: 'content',
        name: 'Content',
        width: 150,
        RowComponents: (props) => (
          <ContentTitle content={props.content} onClick={(id) => confirm(`${id} 컨텐츠로 이동`)} {...props} />
        )
      },
      {
        field: 'reportCount',
        name: 'Reported Count',
        width: 150,
        RowComponents: (props) => <ReportCount {...props} />
      },
      {
        field: 'activation',
        name: 'Activation',
        width: 150,
        RowComponents: (props) => (
          <ActivationSwitch
            isActive={props.activation}
            id={props.id}
            onChange={() => dispatch(openContentsActivationDialog(true))}
          />
        )
      },
      {
        field: 'staff',
        name: 'Staff',
        width: 150,
        RowComponents: (props) => <Profile user={props.staff} />
      },
      {
        field: 'reason',
        name: 'Processed Detail',
        width: 150
      },
      {
        field: 'reportedDate',
        name: 'Processed at',
        width: 150
      }
    ],
    []
  );

  return (
    <div className="admin-reports">
      <div className="admin-reports-table-layout">
        <div className="admin-reports-table-header">
          <input
            className="search-input"
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Please search the content"
          />

          <select
            onChange={(e) => setBoardGroupId(Number(e.target.value))}
            defaultValue={-1}
            className="asdf"
            style={boardGroupId === -1 ? { color: 'gray' } : {}}
          >
            <option disabled value={-1}>
              Board Group
            </option>
            {boardGroups.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setBoardId(Number(e.target.value))}
            defaultValue={-1}
            style={boardId === -1 ? { color: 'gray' } : {}}
            disabled={boards.length < 1}
          >
            <option disabled value={-1}>
              Board
            </option>
            {boards.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>

          <select onChange={(e) => setType(e.target.value)} defaultValue="" style={type ? {} : { color: 'gray' }}>
            <option disabled value="">
              Type
            </option>
            {['All', 'Post', 'Comment'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setActivation(e.target.value)}
            defaultValue=""
            style={activation ? {} : { color: 'gray' }}
          >
            <option disabled value="">
              Status
            </option>
            {['All', 'Active', 'Inactive'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <JButton label="Search" width={85} disabled={searchButtonDisabled} onClick={() => setRows([])} />
          <AdvancedSearchButton
            onClick={() => {
              confirm('고급 검색');
            }}
          />
        </div>
        <div className="admin-reports-table-wrapper">
          <AdminTable
            columns={columns}
            onClickSortButton={onClickSortButton}
            rows={rows}
            sortState={sortState}
            EmptyComponent={ReportsEmpty}
          />
        </div>
      </div>

      <ContentsActivationDialog />
      <ReportHistoryDialog />
    </div>
  );
}

export default Reports;

function ReportsEmpty() {
  return (
    <div className="admin-reports-empty">
      <div>Umm...</div>
      <div>🧐</div>
      <div>NO CONTENT YET</div>
      <div>There are no reports yet</div>
    </div>
  );
}

function AdvancedSearchButton({ onClick }) {
  return (
    <div onClick={onClick}>
      <img src={require('images/admin/advanced-search.svg').default} />
    </div>
  );
}
