import React from 'react';
import { BVD } from '../index';

const ActivationInput = ({ activationLabel, onChange, disabled }) => {
  const disabledClassName = disabled ? 'disabled' : 'none';
  return (
    <div className="boards-contents-activation">
      <div className={`info-title info-title-${disabledClassName}`}>{BVD.activation.title}</div>
      <div className={`info-desc info-desc-${disabledClassName}`}>{BVD.activation.subtitle}</div>
      <div className="activation-radio-wrapper">
        {BVD.activation.list.map((label, index) => (
          <div key={index} className="label-wrapper">
            <input
              type="radio"
              id={label}
              value={label}
              checked={label === activationLabel}
              onChange={onChange}
              disabled={disabled}
            />
            <label htmlFor={label} style={{ color: disabled ? '#777777' : 'black' }}>
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivationInput;
