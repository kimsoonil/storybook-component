/* eslint-disable */

import React, { useState } from 'react';

import 'assets/scss/popup.scss';
import { Button } from 'components/idist/Button';

function InputPopup(props) {
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="inputPopup ">
        <div className="inputPopup-title flex-center">Please enter your password.</div>
        <div className="inputPopup-content flex-center">
          Password <input type="number" vlaue={props.value} onChange={(e) => props.setValue(e.target.value)} />
        </div>
        <div className="inputPopup-actions flex-center">
          <Button label={'Cancel'} primary="cancel" size="m" width={120} onClick={() => props.setOpen(!props.open)} />
          <Button label={'Check'} size="m" width={120} onClick={() => props.secretPosts()} />
        </div>
      </div>
    </div>
  );
}

export default InputPopup;
