import React from 'react';
import { addComma } from 'util/common';

function ForumSummary() {
  return (
    <div>
      <span>{addComma(5555)}</span>post has <span>{addComma(1042120)}</span> comments.
    </div>
  );
}

export default ForumSummary;
