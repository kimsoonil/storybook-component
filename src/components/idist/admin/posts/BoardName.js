import React from 'react';

const BoardName = ({ id, boardName, onClick }) => {
  return <div onClick={() => onClick(id)}>{boardName}</div>;
};

export default BoardName;
