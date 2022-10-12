/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reset as authEmailReset, reqAuthEmail } from 'redux/store/authEmailSlice';
import { reset as authPhoneReset, reqAuthPhoneNumber } from 'redux/store/authPhoneNumberSlice';
import { reset as authCodeReset, reqAuthCode } from 'redux/store/authCodeSlice';
import CountdownCode from 'components/SignUp/SignUp/CountdownCode';
import {
  USER_INFO_SIGNUP,
  USER_INFO_EMAIL,
  USER_INFO_PHONE,
  PHONE_NUMBER_LENGTH,
  PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH,
  AUTH_CODE_LENGTH,
  AUTH_SEND_EMAIL_INTERVAL,
  SEND_AUTH_CODE_TIME_LIMIT,
  USER_INFO_EDIT
} from 'constants/type';

function AuthConfirm({ reqType = USER_INFO_EMAIL, editType = USER_INFO_SIGNUP }) {
  const [isSend, setIsSend] = useState(false);
  const [placeHolder, setPlaceHolder] = useState('');
  const [reStartCountDown, setReStartCountDown] = useState(0);
  const codeRef = useRef();
  const dispatch = useDispatch();

  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));
  const { email, phoneNumber } = useSelector((state) => ({ ...state.signUp.userInfo }));
  const {
    register,
    trigger,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm();
  const watchCode = useWatch({ control, name: 'code', defaultValue: '' });
  const watchPhoneNumber = useWatch({
    control,
    name: USER_INFO_PHONE,
    defaultValue: ''
  });

  const { t } = useTranslation();
  const authCodeText = 'Auth Code';

  const onResetCode = useCallback(() => {
    setValue('code', '');
    dispatch(authCodeReset);
  }, []);

  const onAuthEmail = () => {
    console.log('email 발송');
    setIsSend(true);
    onResetCode();
    setReStartCountDown(reStartCountDown + 1);

    if (reqType === USER_INFO_EMAIL) dispatch(reqAuthEmail({ email: getValues(reqType) }));
    else dispatch(reqAuthPhoneNumber({ phoneNumber: getValues(reqType).replace(/-/g, '') }));
  };

  const onAuthCode = useCallback(() => {
    dispatch(reqAuthCode({ code: getValues('code') }));
  }, [watchCode]);

  useEffect(() => {
    if (reqType === USER_INFO_EMAIL) dispatch(authEmailReset);
    else dispatch(authPhoneReset);
    dispatch(authCodeReset);
  }, []);

  useEffect(() => {
    let placeHolderTxt = '';
    if (editType === USER_INFO_SIGNUP) {
      placeHolderTxt = reqType === USER_INFO_EMAIL ? 'test@test.com' : '010-1234-1234';
    } else {
      placeHolderTxt = reqType === USER_INFO_EMAIL ? email : phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      if (reqType === USER_INFO_EMAIL) setValue(USER_INFO_EMAIL, placeHolderTxt);
      else setValue(USER_INFO_PHONE, placeHolderTxt);
    }

    setPlaceHolder(placeHolderTxt);
  }, [reqType]);

  useEffect(() => {
    if (isSend)
      setTimeout(() => {
        setIsSend(false);
      }, AUTH_SEND_EMAIL_INTERVAL);
  }, [isSend]);

  useEffect(() => {
    if (reqType === USER_INFO_EMAIL) return;

    if (watchPhoneNumber.length === PHONE_NUMBER_LENGTH) {
      setValue('phone', watchPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (watchPhoneNumber.length === PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH) {
      setValue('phone', watchPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [watchPhoneNumber]);

  return (
    <>
      <li>
        <div>
          <label htmlFor={reqType}>
            <input
              id={reqType}
              type="text"
              placeholder={placeHolder}
              aria-invalid={isSend}
              {...register(reqType, {
                required: t('validation.require', { require: reqType }),
                pattern:
                  reqType === USER_INFO_EMAIL
                    ? {
                        value: /\S+@\S+\.\S+/,
                        message: t('validation.emailauth.email')
                      }
                    : {
                        value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                        message: t('validation.emailauth.phone')
                      }
              })}
              disabled={isSend || isConfirm || editType === USER_INFO_EDIT}
              maxLength={reqType === USER_INFO_PHONE ? PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH : ''}
            />
            <button
              type="button"
              onClick={async () => {
                const result = await trigger(reqType);
                if (result) onAuthEmail();
              }}
              disabled={(isSend || isConfirm) && 'disabled'}
            >
              {t('label.emailauth.auth')}
            </button>
          </label>
          {errors[reqType] && <small role="alert">{errors[reqType].message}</small>}
        </div>
      </li>
      <li>
        <div style={{ visibility: isConfirm || reStartCountDown === 0 ? 'hidden' : 'visible' }}>
          <label htmlFor="code">
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
          </label>
          {errors.code && <small role="alert">{errors.code.message}</small>}
          <div>
            <CountdownCode
              isConfirm={isConfirm}
              reStartCountDown={reStartCountDown}
              onComplete={onResetCode}
              timeLimit={SEND_AUTH_CODE_TIME_LIMIT}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              trigger('code');
              onAuthCode();
            }}
            disabled={watchCode?.length !== AUTH_CODE_LENGTH && 'disabled'}
          >
            {t('label.emailauth.confirm')}
          </button>
        </div>
      </li>
    </>
  );
}

export default AuthConfirm;
