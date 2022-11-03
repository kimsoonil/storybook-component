/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/reset.scss';
import 'assets/scss/components.scss';

/**
 * Primary UI component for user interaction
 */
export function Button({ primary, size, line, label, width, disabled, onClick, ...props }) {
  const variant = line ? 'line' : 'contained';
  return (
    <button
      disabled={disabled}
      style={{ width: `${width}px` }}
      className={[
        'button-component',
        `button-size-${size}`,
        `button-${primary}`,
        `button-${variant}`,
        'flex-center'
      ].join(' ')}
      {...props}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.oneOf(['primary', 'secondary', 'point', 'success', 'warming', 'error', 'cancel']),
  line: PropTypes.bool,
  size: PropTypes.oneOf(['xl', 'l', 'm', 's']),
  width: PropTypes.number,
  label: PropTypes.any,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  primary: 'primary',
  line: false,
  size: 'M',
  width: 140,
  label: 'Button',
  disabled: false
};
