/* eslint-disable */

import React from 'react';

import 'assets/scss/popup.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/idist/Button';

function AlertPopup(props) {
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="popup-alert relative">
        <div className="popup-alert-content">{props.content}</div>
        <div className="popup-alert-actions">
          <Button label={'Check'} size="l" onClick={() => props.setOpen()} />
        </div>
      </div>
    </div>
  );
}

export default AlertPopup;
