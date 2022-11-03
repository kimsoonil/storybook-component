import React from 'react';

function RoleBadge({ role }) {
  if (role !== 'operator') return null;

  return (
    <div className="role_badge">
      <span>{role}</span>
    </div>
  );
}

export default RoleBadge;
