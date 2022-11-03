import React from 'react';

function ContentTitle({ content, onClick }) {
  return (
    <div className="admin-reports-content-layout">
      <div
        className="admin-reports-content-text"
        onClick={() => onClick(content.id)}
        onKeyDown={(e) => (e.key === 'Enter' ? onClick(content.id) : {})}
        tabIndex={0}
        role="button"
      >
        {content.text}
      </div>
    </div>
  );
}

export default ContentTitle;
