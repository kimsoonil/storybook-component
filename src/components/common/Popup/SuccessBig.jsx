/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function SuccessBig({ onHide }) {
  return (
    <div className="modal_popup modal_text modal7">
      <div className="modal_con">
        <button className="close" onClick={() => onHide()} />
        <div className="flash_bimg success" />
        <div className="flash_con">
          Your message was sent,
          <br />
          please check your email to confirm
          <br />
          your subscription.
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

export default SuccessBig;
