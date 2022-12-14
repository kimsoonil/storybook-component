/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import PassWordInputBtn from 'components/common/InputButton/PassWordInputBtn';

function PassWordInput({
  control,
  register,
  trigger,
  errors,
  email = '',
  phoneNumber = '',
  isDisabled = false,
  tabIndex
}) {
  const [isViewPwd, setIsViewPwd] = useState(false);
  const [isViewCfmPwd, setIsViewCfmPwd] = useState(false);

  const watchPwd = useWatch({ control, name: 'password', defaultValue: '' });
  const watchConfirmPwd = useWatch({ control, name: 'cfrPassword', defaultValue: '' });

  // const { t } = useTranslation();

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

  // const pwdText = t('label.userinfo.pwd');
  // const pwdText = 'Password';
  // const pwdConfirmText = t('label.userinfo.pwdConfirm');
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 16;

  return (
    <>
      {/* <div className="sign_pass">
        <label>Password</label>
        <SecurityGuide />
      </div> */}
      <div
        className={classNames(
          'form_wrap',
          {
            msg: errors.password || (watchPwd && !errors.password)
          },
          { error: errors.password }
        )}
      >
        <span className="form_cell form_input input_lg">
          <input
            type={isViewPwd ? 'text' : 'password'}
            tabIndex={tabIndex}
            aria-invalid="false"
            placeholder="Password"
            {...register('password', {
              // required: t('validation.require', { require: pwdText }),
              required: 'Please enter a passwor',
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: 'invalid format'
              },
              maxLength: {
                value: PASSWORD_MAX_LENGTH,
                message: 'invalid format'
              },
              validate: {
                pwdVal1: (value) => !/(\w)\1\1/.test(value) || 'invalid format',
                pwdVal2: (value) =>
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[@$!%*?&]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) ||
                  'invalid format',
                pwdVal3: (value) =>
                  checkEmailPhoneNumberInPwd(value) || 'Cannot use more than 3 characters of the same string'
              }
            })}
            onBlur={() => {
              trigger('password');
              if (watchConfirmPwd) trigger('cfrPassword');
            }}
            disabled={isDisabled}
          />
          <PassWordInputBtn status={isViewPwd} statusFunc={() => setIsViewPwd(!isViewPwd)} />
        </span>
        {errors.password && <span className="error_txt msg">{errors.password?.message}</span>}
      </div>
      <div
        className={classNames(
          'form_wrap',
          {
            msg: errors.cfrPassword || (watchPwd && !errors.cfrPassword)
          },
          { error: errors.cfrPassword },
          { success: watchPwd && !errors.cfrPassword }
        )}
      >
        <span className="form_cell form_input input_lg">
          <input
            type={isViewCfmPwd ? 'text' : 'password'}
            tabIndex={tabIndex}
            aria-invalid="false"
            placeholder="Confirm Password"
            {...register('cfrPassword', {
              validate: (value) => value === watchPwd || 'Passwords do not match'
            })}
            disabled={isDisabled}
            onBlur={() => {
              if (watchPwd) trigger('password');
              trigger('cfrPassword');
            }}
          />
          <PassWordInputBtn status={isViewCfmPwd} statusFunc={() => setIsViewCfmPwd(!isViewCfmPwd)} />
        </span>
        {errors.cfrPassword && <span className="error_txt msg">{errors.cfrPassword?.message}</span>}
      </div>
    </>
  );
}

export default PassWordInput;
