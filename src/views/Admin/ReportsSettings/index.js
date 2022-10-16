import React, { useEffect, useMemo, useState } from 'react';
// import { useOutletContext } from 'react-router';
// import { DataGrid } from '@mui/x-data-grid';
// import PostTable from './PostTable';

import JCheckbox from 'components/idist/admin/JCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useOutletContext } from 'react-router';

const ReportsSettings = () => {
  const dispatch = useDispatch();
  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;

  return (
    <div className="admin-reports">
      reports settings
      <div className="reports-table-layout">
        <div className="reports-table-header"></div>

        <div className="reports-table-header" />
      </div>
    </div>
  );
};

export default ReportsSettings;
