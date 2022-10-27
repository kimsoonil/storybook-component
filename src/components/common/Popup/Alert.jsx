import React from 'react';
import { useSelector } from 'react-redux';

function Alert({ onHide }) {
  const { contents } = useSelector((state) => ({ ...state.popup }));
  return (
    <div className="modal_popup alert modal1">
      <div className="popup_con">{contents}</div>
      <div className="popup_btn_wrap full">
        <button type="button" className="btn primary button_l btn_close" onClick={() => onHide()}>
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
}

export default Alert;
