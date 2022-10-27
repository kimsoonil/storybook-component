/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function SuccessSmall({ onHide }) {
  return (
    <div className="modal_popup modal_text modal6">
      <div className="modal_con">
        <button className="close" onClick={() => onHide()} />
        <div className="flash_simg">
          <span className="success">Success!</span>
        </div>
        <div className="flash_con">
          Your Google account has been linked.
          <br />
          Now you can login with Google ID.
        </div>
        <div className="popup_btn_wrap flash">
          <button className="btn_round btn_green btn_close">
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessSmall;
