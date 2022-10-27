/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function OopsBig({ onHide }) {
  return (
    <div className="modal_popup modal_text modal9">
      <div className="modal_con">
        <button className="close" onClick={() => onHide()} />
        <div className="flash_bimg ooops" />
        <div className="flash_con">
          This ID or Password is invalid.
          <br />
          Try again, or Create a new account.
        </div>
        <div className="popup_btn_wrap flash">
          <button className="btn_round btn_red btn_close">
            <span>Try again</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OopsBig;
