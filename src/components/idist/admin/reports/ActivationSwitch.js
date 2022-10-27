/* eslint-disable */
import React, { useMemo } from 'react';
import JSwitch from '../JSwitch';

const ActivationSwitch = ({ id, isActive, onChange }) => {
  const label = useMemo(() => (isActive ? 'Active' : 'Inactive'), [isActive]);

  return (
    <div className="activation-switch">
      <div className="activation-switch-label">{label}</div>
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

export default ActivationSwitch;
