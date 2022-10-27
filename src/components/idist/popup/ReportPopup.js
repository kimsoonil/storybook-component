/* eslint-disable */

import React from 'react';

import 'assets/scss/popup.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/idist/Button';

function ReportPopup(props) {
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="reportpopup relative ">
        <div className="reportpopup-title">Submit a Report</div>
        <div className="closebtn" onClick={() => props.setOpen(!props.open)}>
          <img src={require(`images/club/btn-close.png`)} alt="" />
        </div>
        <div className="reportpopup-content">
          <div className="reportpopup-content-explain">
            Thanks for looking out by reporting things break the rules.Let us know what’s happening, and we’ll look into
            it.
          </div>
          <div className="reportpopup-content-list">
            <div className="reportpopup-content-btn">Breaks rules</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;
