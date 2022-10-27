/* eslint-disable */
import React from 'react';
import Popover from '@mui/material/Popover';
import 'assets/scss/component/jdropdown.scss';

const rootClassName = 'jdropdown';

const JDropDown = ({
  anchorEl,
  onClose,
  menuList = [],

  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right'
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right'
  },
  props
}) => {
  return (
    <JPopOver
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    >
      <div className={`${rootClassName}`}>
        {menuList.map((menu, index) => (
          <div key={index} className={`${rootClassName}-item`} onClick={menu.onClick}>
            {menu.label}
          </div>
        ))}
      </div>
    </JPopOver>
  );
};

export default JDropDown;

export const JPopOver = ({ children, anchorEl, onClose, anchorOrigin, transformOrigin, ...props }) => {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    >
      {children}
    </Popover>
  );
};

// anchorOrigin={{
//   vertical: 'bottom',
//   horizontal: 'right',
// }}
// transformOrigin={{
//   vertical: 'top',
//   horizontal: 'right',
// }}
