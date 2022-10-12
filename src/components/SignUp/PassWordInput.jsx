/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function PassWordInput({ isDisabled = true, setPwd, email = '', phoneNumber = '' }) {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext();

  const watchPwd = useWatch({ control, name: 'password', defaultValue: '' });
  const watchConfirmPwd = useWatch({ control, name: 'confirmPwd', defaultValue: '' });

  const { t } = useTranslation();

  const checkEmailPhoneNumberInPwd = (pwd) => {
    const arrFilter = [];
    for (let i = 0; i < phoneNumber.length - 2; i += 1) {
      arrFilter.push(phoneNumber.substring(i, i + 3));
    }
    for (let i = 0; i < email.length - 2; i += 1) {
      arrFilter.push(email.substring(i, i + 3));
    }
    for (let i = 0; i < arrFilter.length - 1; i += 1) {
      if (pwd.indexOf(arrFilter[i]) !== -1) return false;
    }
    return true;
  };

  const pwdText = t('label.userinfo.pwd');
  const pwdConfirmText = t('label.userinfo.pwdConfirm');
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 16;
  useEffect(() => {
    if (errors.password || errors.confirmPwd || watchConfirmPwd.length < 8) return;
    setPwd(watchPwd);
  }, [watchPwd, watchConfirmPwd]);

  return (
    <>
      <div>
        <label htmlFor="password">
          {pwdText}
          <input
            id="password"
            type="text"
            placeholder="****************"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', {
              required: t('validation.require', { require: pwdText }),
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: t('validation.userinfo.password.invalid')
              },
              maxLength: {
                value: PASSWORD_MAX_LENGTH,
                message: t('validation.userinfo.password.invalid')
              },
              validate: {
                pwdVal1: (value) => !/(\w)\1\1/.test(value) || t('validation.userinfo.password.invalid'),
                pwdVal2: (value) =>
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[@$!%*?&]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) ||
                  'must include lower, upper, number, and special chars',
                pwdVal3: (value) => checkEmailPhoneNumberInPwd(value) || 'email or phonenumber error'
              }
            })}
            onBlur={() => trigger('password')}
            disabled={!isDisabled}
          />
        </label>
        {errors.password && <small role="alert">{errors.password.message}</small>}
      </div>
      <div>
        <label htmlFor="confirmPwd">
          {pwdConfirmText}
          <input
            id="confirmPwd"
            type="password"
            placeholder="****************"
            {...register('confirmPwd', {
              validate: (value) => value === watchPwd || t('validation.userinfo.password', { context: 'confirmPwd' })
            })}
            disabled={!isDisabled}
            onBlur={() => trigger('confirmPwd')}
          />
        </label>
        {errors.confirmPwd && <small role="alert">{errors.confirmPwd.message}</small>}
      </div>
    </>
  );
}

export default PassWordInput;
