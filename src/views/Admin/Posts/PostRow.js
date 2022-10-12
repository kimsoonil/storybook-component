import JCheckbox from 'components/idist/admin/JCheckbox';
import React from 'react';

const PostRow = ({ rowData, checkboxSelection, checked, onClickRowCheckbox, columns }) => {
  //   {
  //     id: 3,
  //     board: 'Crypto',
  //     title: `1 사토시 = 10원 의 시대`,
  //     writer: 'Satoshi Nakamoto',
  //     created: '2023.09.05',
  //     deactive: true,
  //     reportCount: 4
  //   }

  return (
    <div className="post-table-row">
      {checkboxSelection && <JCheckbox checked={checked} onClick={onClickRowCheckbox} />}
      {columns.map(({ Component, columnStyle, field, ...columnItem }, columnIndex) => {
        return (
          <div key={columnIndex} style={columnStyle}>
            {Component ? <Component {...rowData} /> : <div className="post-table-row-text">{rowData[field]}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default PostRow;
