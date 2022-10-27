/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';

function AlertWithTitle({ onHide }) {
  const { contents } = useSelector((state) => ({ ...state.popup }));
  return (
    <div className="modal_popup modal_text size_lg modal3">
      <div className="modal_title">
        <h2>Title</h2>
        <button className="close" onClick={() => onHide()} />
      </div>
      <div className="con">{contents}</div>
      <div className="popup_btn_wrap full">
        <button
          className="btn primary button_l btn_close"
          onClick={() => {
            onHide();
          }}
        >
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}

export default AlertWithTitle;
