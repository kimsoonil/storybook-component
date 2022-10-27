import React from 'react';
import JCheckbox from 'components/idist/admin/JCheckbox';

const AdminRow = ({ rowData, checkboxSelection, checked, onClickRowCheckbox, columns }) => {
  return (
    <div className="admin-table-row">
      {checkboxSelection && <JCheckbox checked={checked} onClick={onClickRowCheckbox} />}
      {columns.map(({ field, width, columnStyle, RowComponents, ...columnProps }, columnIndex) => {
        return (
          <div key={columnIndex} style={{ width: width + 'px', ...columnStyle }}>
            {RowComponents ? (
              <RowComponents {...rowData} />
            ) : (
              <div className="admin-table-row-text">{rowData[field]}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminRow;
