/* eslint-disable */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Dialog } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import JButton from '../JButton';
import AdminTable from '../datatable/AdminTable';
import Profile from './Profile';

const ReportHistoryDialog = ({ submit }) => {
  const dispatch = useDispatch();
  const reportHistory = useSelector((state) => state.adminDialog.reportHistory);
  const rootClassName = 'report-history-dialog';

  const close = () => dispatch(closeDialog('reportHistory'));

  const _rows = [
    {
      id: 1,
      type: 'Post',
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'Kate',
        staff: true
      },
      reason: 'Breaks rules',
      reportedDate: '2022. 09. 03'
    },
    {
      id: 2,
      type: 'Post',
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'mina',
        staff: true
      },
      reason: 'Sexualization of minors',
      reportedDate: '2022. 08. 30'
    },
    {
      id: 3,
      type: 'Post',
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'rurua',
        staff: true
      },
      reason: 'Sharing personal information',
      reportedDate: '2022. 09. 01'
    },
    {
      id: 4,
      type: 'Post',
      reporter: {
        profileImage: require('images/admin/club-master-profile.png'),
        name: 'ddd',
        staff: true
      },
      reason: 'Sharing personal information',
      reportedDate: '2022. 08. 30'
    }
  ];
  const [rows, setRows] = useState(_rows);
  const [sortState, setSortState] = useState({ field: '', step: 0 });

  const onClickSortButton = useCallback(({ field }) => {
    setSortState((prev) => (prev.field === field ? { field, step: (prev.step + 1) % 3 } : { field, step: 1 }));
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'id',
        name: 'No',
        width: 80
      },
      {
        field: 'type',
        name: 'Type',
        width: 80
      },
      {
        field: 'reporter',
        name: 'Reported User',
        width: 120,
        RowComponents: (props) => <Profile user={props.reporter} />
      },
      {
        field: 'reason',
        name: 'Report Detail',
        width: 150
      },
      {
        field: 'reportedDate',
        name: 'ReportedDate',
        width: 120
      }
    ],
    []
  );

  return (
    <Dialog
      open={reportHistory}
      onClose={close}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
    >
      <div className={`${rootClassName}`}>
        <div className={`${rootClassName}-table-wrapper`}>
          <AdminTable columns={columns} onClickSortButton={onClickSortButton} rows={rows} sortState={sortState} />
        </div>

        <hr />

        <div className={`${rootClassName}-button-wrapper`}>
          <JButton width={200} label={'Confirm'} onClick={close} />
        </div>
      </div>
    </Dialog>
  );
};

export default ReportHistoryDialog;
