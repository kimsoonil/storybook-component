import React from 'react';
import 'assets/scss/admin/posts.scss';
import SortButton from 'components/idist/admin/SortButton';

const PostColumn = ({ name, field, columnStyle, sorting, sortState, onClickSortButton }) => {
  const _onClickSortButton = (type) => {
    onClickSortButton({ field, type });
  };

  return (
    <div className="post-table-column" style={columnStyle}>
      <div className="post-table-column-text">{name}</div>
      {sorting && (
        <SortButton
          ascending={sortState.field === field && sortState.type === 'ascending'}
          descending={sortState.field === field && sortState.type === 'descending'}
          onClick={_onClickSortButton}
        />
      )}
    </div>
  );
};

export default PostColumn;
