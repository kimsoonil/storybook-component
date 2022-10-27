import React from 'react';

const BoardName = ({ board, onClick }) => {
  return (
    <div className="admin-reports-board-layout">
      <div className="admin-reports-board-name" onClick={() => onClick(board.id)}>
        {board.title}
      </div>
    </div>
  );
};

export default BoardName;
