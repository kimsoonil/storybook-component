import React from 'react';
import PropTypes from 'prop-types';

export const Text = ({ children, color, size, ...props }) => {
  return <div {...props}>{children}</div>;
};

// Button.propTypes = {
//   primary: PropTypes.oneOf(['Primary', 'Secondary', 'Point']),
//   line: PropTypes.bool,
//   size: PropTypes.oneOf(['XL', 'L', 'M', 'S']),
//   width: PropTypes.number,
//   label: PropTypes.string,
//   disabled: PropTypes.bool
// };

// Button.defaultProps = {
//   primary: 'primary',
//   line: false,
//   size: 'M',
//   width: 140,
//   label: 'Button',
//   disabled: false
// };
