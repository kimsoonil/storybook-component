/* eslint-disable */
import React from 'react';

const ContentTitle = ({ content, onClick }) => {
  return (
    <div className="admin-reports-content-layout">
      <div className="admin-reports-content-text" onClick={() => onClick(content.id)}>
        {content.text}
      </div>
    </div>
  );
};

export default ContentTitle;
