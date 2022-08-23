import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../assets/css/components.css';

export function TextField({ Placeholder, Disabled, Readonly, state, value, helpText }) {
  return (
    <div className="text-field">
      <div className="cgp-input-field">
        <input
          className={`${state} cgp-input`}
          placeholder={Placeholder}
          disabled={Disabled}
          readOnly={Readonly}
          value={value}
        />
        <span className={`${state} help-text`}>{helpText}</span>
      </div>
    </div>
  );
}
TextField.propTypes = {
  Placeholder: PropTypes.string,
  Disabled: PropTypes.bool,
  Readonly: PropTypes.bool,
  state: PropTypes.oneOf(['', 'success', 'error']),
  value: PropTypes.string,
  helpText: PropTypes.string
};

TextField.defaultProps = {
  Placeholder: 'Placeholder text',
  Disabled: false,
  Readonly: false,
  state: '',
  value: PropTypes.string,
  helpText: PropTypes.string
};
