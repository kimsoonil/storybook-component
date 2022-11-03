import React from 'react';

function BoardName({ board, onClick }) {
  return (
    <div className="admin-reports-board-layout">
      <div
        className="admin-reports-board-name"
        onClick={() => onClick(board.id)}
        onKeyDown={(e) => (e.key === 'Enter' ? onClick(board.id) : {})}
        tabIndex={0}
        role="button"
      >
        {board.title}
      </div>
    </div>
  );
}

export default BoardName;
