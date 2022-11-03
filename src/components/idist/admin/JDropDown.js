/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Popover from '@mui/material/Popover';
import 'assets/scss/component/jdropdown.scss';

const rootClassName = 'jdropdown';

function JDropDown({
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
}) {
  return (
    <JPopOver
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    >
      <div className={`${rootClassName}`}>
        {menuList.map((menu, index) => {
          const key = `drop${index}`;
          return (
            <div
              key={key}
              className={`${rootClassName}-item`}
              onClick={menu.onClick}
              onKeyDown={(e) => (e.key === 'Enter' ? menu.onClick(e) : {})}
              tabIndex={0}
              role="button"
            >
              {menu.label}
            </div>
          );
        })}
      </div>
    </JPopOver>
  );
}

export default JDropDown;

export function JPopOver({ children, anchorEl, onClose, anchorOrigin, transformOrigin, ...props }) {
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
}

// anchorOrigin={{
//   vertical: 'bottom',
//   horizontal: 'right',
// }}
// transformOrigin={{
//   vertical: 'top',
//   horizontal: 'right',
// }}
