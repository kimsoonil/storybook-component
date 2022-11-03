import React from 'react';
import 'assets/scss/admin/admin.scss';

function AdminColumn({ width, columnStyle }) {
  // function AdminColumn({ field, name, width, columnStyle, sorting, sortState, onClickSortButton }) {
  // const ascendingImage =
  //   sortState.field === field && sortState.step === 1
  //     ? require('images/components/button/sort/sort-arrow-up-active.svg').default
  //     : require('images/components/button/sort/sort-arrow-up.svg').default;
  // const descendingImage =
  //   sortState.field === field && sortState.step === 2
  //     ? require('images/components/button/sort/sort-arrow-down-active.svg').default
  //     : require('images/components/button/sort/sort-arrow-down.svg').default;

  return (
    <div className="admin-table-column" style={{ width: `${width}px`, ...columnStyle }}>
      {/* <div className="admin-table-column-inner" onClick={() => onClickSortButton({ field })}>
        <div className="admin-table-column-text">{name}</div>
        {sorting && (
          <div className="admin-table-column-sorting">
            <img src={ascendingImage} />
            <img src={descendingImage} />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default AdminColumn;
