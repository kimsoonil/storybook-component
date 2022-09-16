import React from 'react';
import { isDimmedClick } from 'utils/domUtils';
import 'assets/scss/component/popup-layer.scss';

const popupClassName = 'jg-popup';

export const PopupLayer = ({ isOpen, close, children }) => {
  const onClick = (e) => {
    if (isDimmedClick(e, popupClassName)) {
      close();
    }
  };

  return (
    <div className={`${popupClassName}`} onClick={onClick} style={{ display: isOpen ? 'flex' : 'none' }}>
      {children}
    </div>
  );
};

export const PopupWrapper = ({ children }) => {
  return <div className={`${popupClassName}-wrapper`}>{children}</div>;
};
