import React from 'react';
import { addComma } from 'util/common';

function PostSummary() {
  return (
    <div>
      <span>{addComma(1000)}</span>active users on <span>{addComma(50)}</span> forums.
    </div>
  );
}

export default PostSummary;
