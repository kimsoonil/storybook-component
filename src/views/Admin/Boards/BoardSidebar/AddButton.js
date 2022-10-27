import React from 'react';

const AddButton = ({ selected, onClick }) => {
  const selectedClassName = selected ? 'selected' : 'none';
  return (
    <div className={`hover-option hover-option-${selectedClassName}`}>
      <div className="hover-option-button" onClick={onClick}>
        <img src={require('images/admin/board/add-square.svg').default} />
      </div>
    </div>
  );
};

export default AddButton;
