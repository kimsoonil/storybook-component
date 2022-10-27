/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/component/jbutton.scss';

const JButton = ({ label, color, children, outline, size, disabled, width, onClick, ...props }) => {
  const rootClassName = 'jg-button';
  // const typeClassName = outline ? rootClassName + '-outline' : rootClassName + '-contain';
  const typeClassName = outline ? 'outline' : 'contain';
  const disabledClassName = disabled ? typeClassName + '-disabled' : '-';

  return (
    <div
      disabled={disabled}
      style={{ ...(width && { width: `${width}px` }) }}
      className={`${rootClassName} 
        ${rootClassName}-${size} 
        ${rootClassName}-${typeClassName}-${color} 
        ${rootClassName}-${disabledClassName}
        `}
      onClick={disabled ? () => {} : onClick}
      {...props}
    >
      {label || children}
    </div>
  );
};

export default JButton;

JButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'point', 'none']),
  label: PropTypes.string,
  children: PropTypes.element,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  disabled: PropTypes.bool,
  width: PropTypes.number
};

JButton.defaultProps = {
  color: 'primary',
  label: 'button',
  children: <div>button</div>,
  size: 'm',
  disabled: false,
  outline: false,
  width: 140
};
