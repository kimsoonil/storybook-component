/* eslint-disable */

import React from 'react';

import 'assets/scss/popup.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/idist/Button';

function ConfirmPopup(props) {
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="popup-confirm relative">
        <div className="popup-confirm-content">{props.content}</div>
        <div className="popup-confirm-actions">
          <Button label={'Cancel'} primary="cancel" size="l" onClick={() => props.setOpen()} />
          <Button label={'Check'} size="l" onClick={() => props.popupFuc()} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
