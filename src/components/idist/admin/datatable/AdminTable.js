/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import JCheckbox from 'components/idist/admin/JCheckbox';
import AdminColumn from './AdminColumn';
import AdminRow from './AdminRow';
import 'assets/scss/admin/admin.scss';

/**
 * columns - field, name, width, columnStyle, ColumnComponent, RowComponents, sorting
 *
 * checkboxSelection - 테이블에 전체 선택 기능
 * checked - [checkboxSelection = true 선택 시 required*] 체크박스 체크 상태
 * indeterminate - 체크박스 indeterminate 상태
 * onClickCheckBox - column에 있는 체크박스 클릭시
 * checkedList - 체크된 항목
 * onClickRowCheckbox - data row 에 있는 체크박스 클릭 시
 * sortState - 정렬 정보
 * onClickSortButton - 정렬 버튼 클릭시
 */
function AdminTable({
  columns,
  rows,
  checkboxSelection = false,
  checked,
  indeterminate,
  onClickCheckBox,
  checkedList,
  onClickRowCheckbox,
  sortState,
  onClickSortButton,
  EmptyComponent
}) {
  return (
    <div className="admin-table">
      <div className="admin-table-columns">
        {checkboxSelection && <JCheckbox checked={checked} indeterminate={indeterminate} onClick={onClickCheckBox} />}
        {columns.map(({ field, name, width, columnStyle, ColumnComponent, sorting = true, ...columnProps }) =>
          ColumnComponent ? (
            <ColumnComponent
              key={field}
              field={field}
              name={name}
              width={width}
              columnStyle={columnStyle}
              sorting={sorting}
              sortState={sortState}
              onClickSortButton={onClickSortButton}
              {...columnProps}
            />
          ) : (
            <AdminColumn
              key={field}
              field={field}
              name={name}
              width={width}
              columnStyle={columnStyle}
              sorting={sorting}
              sortState={sortState}
              onClickSortButton={onClickSortButton}
            />
          )
        )}
      </div>
      {rows.length < 1 ? (
        <EmptyComponent />
      ) : (
        <div style={{ overflow: 'auto' }}>
          {rows.map((rowData, rowIndex) => {
            const key = `row${rowIndex}`;
            return (
              <AdminRow
                key={key}
                checkboxSelection={checkboxSelection}
                rowData={rowData}
                checked={checkedList?.includes?.(rowData.id)}
                onClickRowCheckbox={() => onClickRowCheckbox(rowData.id)}
                columns={columns}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminTable;
