import React from 'react';

const SortButton = ({ ascending, descending, onClick }) => {
  // Todo 스타일 분리 할 것!
  const ascendingImage = ascending
    ? require('images/components/button/sort/sort-arrow-up-active.svg').default
    : require('images/components/button/sort/sort-arrow-up.svg').default;
  const descendingImage = descending
    ? require('images/components/button/sort/sort-arrow-down-active.svg').default
    : require('images/components/button/sort/sort-arrow-down.svg').default;

  return (
    <div className="post-table-column-sorting">
      <img src={ascendingImage} onClick={() => onClick('ascending')} />
      <img src={descendingImage} onClick={() => onClick('descending')} />
    </div>
  );
};

export default SortButton;
