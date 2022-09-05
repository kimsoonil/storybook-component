import React from 'react';
import 'assets/scss/component/tag.scss';

const Tag = ({ value, onClick = () => {}, deletable, onDelete = () => {}, ...props }) => {
  return (
    <button className="tag-root" onClick={onClick}>
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
