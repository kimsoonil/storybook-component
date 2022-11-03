/* eslint-disable */

import React from 'react';
import 'assets/scss/popup.scss';
import 'assets/scss/reset.scss';
import ToggleBtn from 'components/idist/ToggleBtn';

function ActivityPopup(props) {
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="activitypopup relative">
        <div className="reportpopup-title">Activity settings</div>
        <div className="closebtn" onClick={() => props.setOpen(!props.open)} style={{ top: '20px' }}>
          <img src={require(`images/club/btn-close.png`)} alt="" style={{ width: '40px' }} />
        </div>

        <div className="activitypopup-content">
          <div className="activitypopup-content-title">Notion</div>
          <div className="activitypopup-content-item flex-between">
            <div>Mention</div>
            <div>
              <ToggleBtn id={'Mention'} />
            </div>
          </div>
          <div className="activitypopup-content-item flex-between">
            <div>Post</div>
            <div>
              <ToggleBtn id={'Post'} />
            </div>
          </div>
          <div className="activitypopup-content-item flex-between">
            <div>Comment</div>
            <div>
              <ToggleBtn id={'Comment'} />
            </div>
          </div>
          <div className="activitypopup-content-item flex-between">
            <div>Like</div>
            <div>
              <ToggleBtn id={'Like'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPopup;
