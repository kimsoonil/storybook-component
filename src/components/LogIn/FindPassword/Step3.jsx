/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { encryptCode } from 'util/common';
import PassWordInput from 'components/SignUp/PassWordInput';
import { reset as changePasswordReset, reqChangePassword } from 'redux/store/common/changePasswordSlice';
import {
  POPUP_TYPE_ALERT,
  POPUP_TYPE_CONFIRM,
  VERIFY_SEND_SOURCE_EMAIL,
  VERIFY_SEND_TYPE_CHANGE
} from 'constants/type';
import { reset as popupReset, showPopup } from 'redux/store/common/popupSlice';

function Step3({ onHide }) {
  const {
    register,
    trigger,
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  // const { t } = useTranslation();

  const { code } = useSelector((state) => ({ ...state.authCode }));
  const { email } = useSelector((state) => ({ ...state.authEmail }));
  const { isSuccess } = useSelector((state) => ({ ...state.changePassword }));
  const { isConfirm } = useSelector((state) => ({ ...state.popup }));

  const watchPassword = useWatch({ control, name: 'password', defaultValue: '' });

  const dispatch = useDispatch();
  // const onTest = () => {
  //   dispatch(
  //     reqChangePassword({
  //       email,
  //       password: encryptCode(watchPassword),
  //       verify_source: VERIFY_SEND_SOURCE_EMAIL,
  //       verify_type: VERIFY_SEND_TYPE_CHANGE,
  //       code,
  //       username: email
  //     })
  //   );
  // };
  const onConfirmPopup = () => {
    dispatch(
      showPopup({
        type: POPUP_TYPE_CONFIRM,
        isDim: true,
        contents: 'Are you sure you want to change your password?'
      })
    );
  };

  useEffect(() => {
    console.log('code::', code);
    console.log('email::', email);
    console.log('isConfirm::', isConfirm);

    if (code && isConfirm) {
      // if (!isShow && isConfirm) {
      console.log('isConfirm', isConfirm);
      dispatch(
        reqChangePassword({
          email,
          password: encryptCode(watchPassword),
          verify_source: VERIFY_SEND_SOURCE_EMAIL,
          verify_type: VERIFY_SEND_TYPE_CHANGE,
          code,
          username: email
        })
      );
    }
  }, [watchPassword, isConfirm]);

  useEffect(() => {
    // popup reset
    dispatch(popupReset());
  }, []);

  useEffect(() => {
    // password 변경 완료 되면 popup close
    if (isSuccess) {
      dispatch(
        showPopup({
          type: POPUP_TYPE_ALERT,
          contents: 'Password has been changed.'
        })
      );
      dispatch(changePasswordReset());
      onHide();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="bg_con">
        <div className="search_title">
          <span className="step">STEP 03</span>
          <span className="title_text">Change Password</span>
        </div>
        <div className="search_text nopadding">
          Please enter 8 to 16 digits using a combination of English’s uppercase letters, lowercase letters, numbers,
          and special characters.
        </div>
        <div className="security_guide">
          <button type="button" className="open_tip">
            <span>Security Guide</span>
          </button>
          <div className="tooltip password">
            <h4>Strong Password</h4>
            <span>
              Enter a password that contains 8 - 16 characters from at least three of the following categories:
              uppercase/lowercase letters, numbers, and special characters.
            </span>
            <span>
              Repeated or sequence characters and letters, birthday, contact number, and other passwords that are easy
              to predict or are related to personal information are vulnerable due to weak security strength.
            </span>
            <span>Using a password that you use in other websites can also endanger the account security.</span>
          </div>
        </div>
        <PassWordInput control={control} register={register} trigger={trigger} errors={errors} />
      </div>
      <div className="popup_btn_wrap full">
        <button
          className="btn primary button_lg btn_close"
          disabled={!watchPassword || errors.password}
          onClick={onConfirmPopup}
        >
          <span>Change Password</span>
        </button>
      </div>
    </>
  );
}

export default Step3;
