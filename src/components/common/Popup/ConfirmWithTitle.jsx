/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';

function ConfirmWithTitle({ onHide }) {
  const { contents } = useSelector((state) => ({ ...state.popup }));
  return (
    <div className="modal_popup modal_text size_sm modal5">
      <div className="modal_title">
        <h2>Title</h2>
        <button className="close" onClick={() => onHide()} />
      </div>
      <div className="con">{contents}</div>
      <div className="popup_btn_wrap right">
        <button
          className="btn default button_l"
          onClick={() => {
            onHide();
          }}
        >
          <span>Cancel</span>
        </button>
        <button
          className="btn primary button_l"
          onClick={() => {
            onHide();
          }}
        >
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
}

export default ConfirmWithTitle;
