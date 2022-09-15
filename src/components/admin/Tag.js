import React from 'react';
import 'assets/scss/component/tag.scss';

const Tag = ({
  value,
  onClick = () => {
    confirm(`'#${value}' 검색 페이지로 이동`);
  },
  deletable,
  onDelete = () => {},
  ...props
}) => {
  return (
    <button className="tag-root" onClick={onClick} style={{ zIndex: 10 }}>
      <div className="jg-row jg-center">
        {`#${value}`}
        {deletable && (
          <div className="deletable" onClick={onDelete}>
            X
          </div>
        )}
      </div>
    </button>
  );
};

export default Tag;
