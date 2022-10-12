import JCheckbox from 'components/idist/admin/JCheckbox';
import React from 'react';
import PostColumn from './PostColumn';
import PostRow from './PostRow';

const PostTable = ({
  columns,
  rows,
  checkboxSelection,
  checked,
  indeterminate,
  checkedList,
  onClickCheckBox,
  onClickRowCheckbox,
  sortState,
  onClickSortButton
}) => {
  return (
    <div className="post-table">
      <div className="post-table-columns">
        {checkboxSelection && <JCheckbox checked={checked} onClick={onClickCheckBox} indeterminate={indeterminate} />}
        {columns.map(({ field, name, columnStyle, sorting }) => (
          <PostColumn
            key={field}
            field={field}
            name={name}
            columnStyle={columnStyle}
            sorting={sorting}
            sortState={sortState}
            onClickSortButton={onClickSortButton}
          />
        ))}
      </div>
      <div style={{ overflowY: 'auto' }}>
        {rows.map((rowData, rowIndex) => {
          return (
            <PostRow
              key={rowIndex}
              checkboxSelection
              rowData={rowData}
              checked={checkedList.includes(rowData.id)}
              onClickRowCheckbox={() => onClickRowCheckbox(rowData.id)}
              columns={columns}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostTable;
