/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reset as authEmailReset, reqAuthEmail } from 'redux/store/common/authEmailSlice';
import { reset as authCodeReset, reqAuthCode } from 'redux/store/common/authCodeSlice';
import { showPopup } from 'redux/store/common/popupSlice';
import CountdownCode from 'components/SignUp/SignUp/CountdownCode';
import {
  USER_INFO_SIGNUP,
  USER_INFO_EMAIL,
  AUTH_SEND_EMAIL_INTERVAL,
  USER_INFO_EDIT,
  AUTH_CODE_LENGTH,
  SEND_AUTH_CODE_TIME_LIMIT,
  POPUP_TYPE_ALERT
} from 'constants/type';

function AuthConfirm2({ editType = USER_INFO_SIGNUP }) {
  const [isSend, setIsSend] = useState(false);
  const [placeHolder, setPlaceHolder] = useState('');
  const [reStartCountDown, setReStartCountDown] = useState(0);
  const codeRef = useRef();
  const dispatch = useDispatch();
  const reqType = USER_INFO_EMAIL;

  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));
  // const { email } = useSelector((state) => ({ ...state.signUp.userInfo }));
  const {
    register,
    trigger,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm();
  const watchCode = useWatch({ control, name: 'code', defaultValue: '' });

  const { t } = useTranslation();
  const authCodeText = 'Auth Code';

  const onResetCode = useCallback(() => {
    setValue('code', '');
    dispatch(authCodeReset);
  }, []);

  const onAuthEmail = () => {
    console.log('email 발송');
    dispatch(showPopup({ type: POPUP_TYPE_ALERT, contents: 'send email' }));
    setIsSend(true);
    onResetCode();
    setReStartCountDown(reStartCountDown + 1);

    dispatch(reqAuthEmail({ email: getValues(reqType) }));
  };

  const onAuthCode = useCallback(() => {
    dispatch(reqAuthCode({ code: getValues('code') }));
  }, [watchCode]);

  useEffect(() => {
    dispatch(authEmailReset);
    dispatch(authCodeReset);
  }, []);

  useEffect(() => {
    const placeHolderTxt = 'superclub@ccr.co.kr';
    // if (editType === USER_INFO_SIGNUP) {
    //   placeHolderTxt = reqType === USER_INFO_EMAIL ? 'test@test.com' : '010-1234-1234';
    // } else {
    //   placeHolderTxt = reqType === USER_INFO_EMAIL ? email : phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //   if (reqType === USER_INFO_EMAIL) setValue(USER_INFO_EMAIL, placeHolderTxt);
    //   else setValue(USER_INFO_PHONE, placeHolderTxt);
    // }

    setPlaceHolder(placeHolderTxt);
  }, [reqType]);

  useEffect(() => {
    if (isSend)
      setTimeout(() => {
        setIsSend(false);
      }, AUTH_SEND_EMAIL_INTERVAL);
  }, [isSend]);

  //   useEffect(() => {
  //     if (reqType === USER_INFO_EMAIL) return;

  //     if (watchPhoneNumber.length === PHONE_NUMBER_LENGTH) {
  //       setValue('phone', watchPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
  //     }
  //     if (watchPhoneNumber.length === PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH) {
  //       setValue('phone', watchPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
  //     }
  //   }, [watchPhoneNumber]);

  return (
    <div className="form_wrap msg btn_set success">
      <span className="form_cell form_input input_md default between">
        <div className="input_set">
          <input
            id={reqType}
            type="text"
            placeholder={placeHolder}
            aria-invalid={isSend}
            {...register(reqType, {
              required: t('validation.require', { require: reqType }),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('validation.emailauth.email')
              }
            })}
            disabled={isSend || isConfirm || editType === USER_INFO_EDIT}
            // maxLength={reqType === USER_INFO_PHONE ? PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH : ''}
          />
          <button className="btn_reset">
            <span className="a11y">삭제</span>
          </button>
          {/* <div class="dot error">
          <span class="a11y">실패</span>
        </div> */}
        </div>
        <button
          type="button"
          className="btn primary button_md"
          onClick={async () => {
            const result = await trigger(reqType);
            if (result) onAuthEmail();
          }}
          disabled={isSend || isConfirm}
        >
          <span>{t('label.emailauth.auth')}</span>
        </button>
      </span>
      <span className="form_cell form_input input_md between">
        <div className="input_set">
          <input
            id="code"
            type="code"
            ref={codeRef}
            placeholder="Auth Code"
            maxLength={AUTH_CODE_LENGTH}
            {...register('code', {
              required: t('validation.require', { require: authCodeText })
            })}
            // disabled={!isSend}
          />
          <span className="guide_text time">
            <span>
              <CountdownCode
                isConfirm={isConfirm}
                reStartCountDown={reStartCountDown}
                onComplete={onResetCode}
                timeLimit={SEND_AUTH_CODE_TIME_LIMIT}
              />
            </span>
          </span>
        </div>
        <button
          type="button"
          className="btn primary button_md"
          onClick={() => {
            trigger('code');
            onAuthCode();
          }}
          disabled={watchCode?.length !== AUTH_CODE_LENGTH}
        >
          <span>Confirm</span>
        </button>
      </span>
      {errors.email && (
        <span className="error_txt msg" id="input_error">
          {errors.email.message}
        </span>
      )}
      {/* <span className="success_txt msg" id="input_alert">
        Authentication completed!
      </span> */}
      {/* <span class="error_txt msg" id="input_alert">The authentication code is incorrect.</span> */}
      {/* <span class="default_txt msg" id="input_alert">If you didn’t receive the code, click the Authenticate button again.</span> */}
      {/* <span class="default_txt msg" id="input_alert">You can authenticate to another email registered in your account.</span> */}
      {/* <span class="error_txt msg" id="input_error">No matching email account found.</span> */}
      {/* <span class="error_txt msg" id="input_error">The authentication code is incorrect.</span> */}
      {/* <span class="success_txt msg" id="input_success">Authentication completed!</span> */}
    </div>
  );
}

export default AuthConfirm2;
