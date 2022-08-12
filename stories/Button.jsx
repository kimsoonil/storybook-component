import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, size, line, label, disabled, ...props }) => {
  const variant = line ? 'line' : 'contained';
  return (
    <button
      type="button"
      disabled={disabled}
      className={['storybook-button', `button-${size}`, `button-${primary}`, `button-${variant}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.oneOf(['Primary', 'Secondary', 'Point']),
  line: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['XL', 'L', 'M', 'S']),
  /**
   * Button contents
   */
  // label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  disabled: PropTypes.bool
};

Button.defaultProps = {
  primary: 'primary',
  size: 'M',
  label: 'Button'
};
