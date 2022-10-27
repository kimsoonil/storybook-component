/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUrl } from 'redux/store/common/popupSlice';

function Navigate({ onHide }) {
  const { contents, title, prePath, nextPath } = useSelector((state) => ({ ...state.popup }));
  const dispatch = useDispatch();

  return (
    <div className="modal_popup modal_text size_lg modal4">
      <div className="modal_title">
        <h2>{title}</h2>
        <button className="close" onClick={() => onHide()} />
      </div>
      <div className="con">{contents}</div>
      <div className="popup_btn_wrap between">
        <button
          className="btn popup_back button_l"
          onClick={() => {
            onHide();
            dispatch(setUrl(prePath));
          }}
        >
          <span>Back</span>
        </button>
        <button
          className="btn primary button_l"
          onClick={() => {
            onHide();
            dispatch(setUrl(nextPath));
          }}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default Navigate;
