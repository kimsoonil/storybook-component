import React, { useMemo } from 'react';
import JSwitch from '../JSwitch';

const ActiveSwitch = ({ id, isActive, onChange }) => {
  const label = useMemo(() => (isActive ? 'Activate' : 'Deactivate'), [isActive]);

  return (
    <div className="active-switch">
      <div className="active-switch-label">{label}</div>
      <JSwitch
        checked={!isActive}
        onChange={(e) => onChange(id, !e.target.checked)}
        width={42}
        height={24}
        margin={2}
      />
    </div>
  );
};

export default ActiveSwitch;
