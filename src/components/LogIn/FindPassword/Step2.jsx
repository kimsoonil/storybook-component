/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';
import { VERIFY_SEND_TYPE_CHANGE } from 'constants/type';
import AuthConfirm from 'components/SignUp/AuthConfirm';

function Step2({ setStatus, onHide }) {
  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));
  const onNext = () => {
    setStatus(3);
  };

  return (
    <>
      <div className="bg_con">
        <div className="search_title">
          <span className="step">STEP 02</span>
          <span className="title_text">Account Authenticate</span>
        </div>
        <div className="search_text">
          Please select the means to receive the authentication code
          <br />
          and proceed with the authentication.
        </div>
        <div className="radio_button">
          <div className="radio_wrap half">
            <span className="form_cell btn_radio size_lg">
              <input type="radio" id="radio1" defaultChecked />
              <label htmlFor="radio1">
                <span>E-mail</span>
              </label>
            </span>
            <span className="form_cell btn_radio size_lg">
              <input type="radio" id="radio2" disabled />
              <label htmlFor="radio2">
                <span>Cellphone</span>
              </label>
            </span>
          </div>
        </div>
        <span className="shadow_line popup" />
        <AuthConfirm verifyType={VERIFY_SEND_TYPE_CHANGE} />
      </div>
      <div className="popup_btn_wrap right">
        <button type="button" className="btn default button_lg btn_close" onClick={onHide}>
          <span>Cancel</span>
        </button>
        <button className="btn primary button_lg btn_close" disabled={!isConfirm} onClick={onNext}>
          <span>Next</span>
        </button>
      </div>
    </>
  );
}

export default Step2;
