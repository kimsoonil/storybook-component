/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isConfirmPopup2 } from 'redux/store/common/popupSlice';

function Nickname({ onHide }) {
  const { contents } = useSelector((state) => ({ ...state.popup }));
  const dispatch = useDispatch();
  const onConfirm = () => {
    // set isConfirm : true
    dispatch(isConfirmPopup2());
    onHide();
  };
  return (
    <div className="modal_popup modal_text" style={{ width: 440, height: 330 }}>
      <div className="modal_con">
        <button type="button" className="close" onClick={onHide} />
        <h2 className="modal_title">Change Nickname</h2>
        <div className="con">
          <span className="popup_nick_text">Are you sure change your nickname?</span>
          <div className="popup_nick">{contents}</div>
          <ul className="guide error">
            <li>You can’t change a nickname that you have changed once again.</li>
          </ul>
        </div>
        <div className="popup_btn_wrap right">
          <button className="btn default button_lg" onClick={onHide}>
            <span>Cancel</span>
          </button>
          <button className="btn primary button_lg" onClick={onConfirm}>
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nickname;
