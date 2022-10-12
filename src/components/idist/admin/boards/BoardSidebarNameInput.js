import React from 'react';

const BoardSidebarNameInput = ({ value, onChange, placeholder, onRename = () => {} }) => {
  return (
    <input
      className="boards-sidebar-name-input"
      type={'text'}
      value={value}
      onChange={onChange}
      autoFocus
      onFocus={(e) => {
        e.target.select();
      }}
      maxLength={20}
      placeholder={placeholder}
      onBlur={onRename}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onRename(e);
        }
      }}
    />
  );
};

export default BoardSidebarNameInput;
