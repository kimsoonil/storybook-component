/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { encryptCode } from 'util/common';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { reqSignUp } from 'redux/store/common/signUpSlice';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import InputStatusBtn from 'components/common/InputButton/InputStatusBtn';
import ReCapcha from 'components/common/ReCapcha';
import PassWordInput from './PassWordInput';
import SecurityGuide from './SecurityGuide';

function Info() {
  const [isCapcha, setIsCapcha] = useState(false);
  const [isFocusFN, setIsFocusFN] = useState(false);
  const [isFocusLN, setIsFocusLN] = useState(false);
  const { code } = useSelector((state) => ({ ...state.authCode }));
  const { email } = useSelector((state) => ({ ...state.authEmail }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    control,
    trigger,
    setValue,
    formState: { isValid, errors }
  } = useForm({ mode: 'onChange' });

  const watchFirstName = useWatch({ control, name: 'firstName', defaultValue: '' });
  const watchLastName = useWatch({ control, name: 'lastName', defaultValue: '' });
  const watchPassword = useWatch({ control, name: 'password', defaultValue: '' });
  const watchConfirmPwd = useWatch({ control, name: 'cfrPassword', defaultValue: '' });

  const { t } = useTranslation();

  const onSignUp = () => {
    const userInfo = {
      first_name: watchFirstName,
      last_name: watchLastName,
      password: encryptCode(watchPassword),
      code,
      username: email,
      email
    };
    dispatch(reqSignUp({ userInfo, navigate }));
  };

  useEffect(() => {
    console.log('watchPwd:::', watchPassword);
    console.log('watchConfirmPwd:::', watchConfirmPwd);
    if (watchConfirmPwd) trigger('cfrPassword');
  }, [watchPassword, watchConfirmPwd]);

  const NAME_MAX_LENGTH = 10;
  return (
    <FormProvider {...methods}>
      <form>
        <div id="wrap">
          <Header />
          <div id="main">
            <div id="container">
              <div className="login_wrap">
                <div className="signup">
                  <h3 className="h3Type eng">SIGN UP</h3>
                  <span>
                    Create your SUPER CLUB member profile and get first
                    <br />
                    access to the inspiration and community.
                  </span>
                </div>
                {/* msg error/success/default */}
                <div
                  className={classNames(
                    'form_wrap',
                    {
                      msg:
                        errors.firstName ||
                        errors.lastName ||
                        (!errors.firstName &&
                          !errors.lastName &&
                          watchFirstName &&
                          watchLastName &&
                          !isFocusFN &&
                          !isFocusLN)
                    },
                    { error: errors.firstName || errors.lastName },
                    { success: watchFirstName && watchLastName && !isFocusFN && !isFocusLN },
                    'sign_name'
                  )}
                >
                  <label htmlFor="firstName">Name</label>
                  <div className="HGroup">
                    <span className="form_cell form_input input_lg">
                      <input
                        type="text"
                        id="firstName"
                        aria-invalid="false"
                        placeholder="First Name"
                        {...register('firstName', {
                          required: t('validation.require', { require: 'firstName' }),
                          maxLength: {
                            value: NAME_MAX_LENGTH,
                            message: t('validation.userinfo.name', { context: 'maxLength' })
                          }
                        })}
                        onFocus={() => setIsFocusFN(true)}
                        onBlur={() => setIsFocusFN(false)}
                      />
                      <InputStatusBtn
                        errors={errors.firstName}
                        isFocus={isFocusFN}
                        isInputVal={watchFirstName}
                        resetFunc={() => setValue('firstName', '')}
                      />
                    </span>
                    <span className="form_cell form_input input_lg">
                      <input
                        type="text"
                        id="lastName"
                        aria-invalid="false"
                        placeholder="Last Name"
                        {...register('lastName', {
                          required: t('validation.require', { require: 'lastName' }),
                          maxLength: {
                            value: NAME_MAX_LENGTH,
                            message: t('validation.userinfo.name', { context: 'maxLength' })
                          }
                        })}
                        onFocus={() => setIsFocusLN(true)}
                        onBlur={() => setIsFocusLN(false)}
                      />
                      <InputStatusBtn
                        errors={errors.lastName}
                        isFocus={isFocusLN}
                        isInputVal={watchLastName}
                        resetFunc={() => setValue('lastName', '')}
                      />
                    </span>
                  </div>
                  {/* name error_msg/success_msg/default_msg  */}
                  {(errors.firstName || errors.lastName) && (
                    <span className="error_msg msg">{errors.firstName?.message || errors.lastName?.message}</span>
                  )}
                </div>
                <div className="sign_pass">
                  <label>Password</label>
                  <SecurityGuide />
                </div>
                <PassWordInput
                  control={control}
                  register={register}
                  trigger={trigger}
                  errors={errors}
                  watchPwd={watchPassword}
                  watchConfirmPwd={watchConfirmPwd}
                />
                <ReCapcha setIsCapcha={setIsCapcha} />
                {errors.verifyCapcha && <span className="error_msg">Please verify security.</span>}
                <button
                  type="button"
                  className="btn primary button_xl join_next"
                  onClick={onSignUp}
                  disabled={
                    !isCapcha || !isValid || !watchFirstName || !watchLastName || !watchPassword || errors.password
                  }
                >
                  <span>Join Membership</span>
                </button>
                <div className="join_link">
                  <span>Already a membership?</span>
                  <button type="button" className="color">
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Info;
