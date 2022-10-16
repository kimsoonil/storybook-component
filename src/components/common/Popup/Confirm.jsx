/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';

function Confirm({ onHide }) {
  const { contents } = useSelector((state) => ({ ...state.popup }));
  return (
    <div className="modal_popup alert modal2">
      <div className="popup_con">{contents}</div>
      <div className="popup_btn_wrap half">
        <button className="btn default button_l btn_close" onClick={() => onHide()}>
          <span>Cancel</span>
        </button>
        <button className="btn primary button_l btn_close" onClick={() => onHide()}>
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}

export default Confirm;
