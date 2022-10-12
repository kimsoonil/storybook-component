/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { reqSignUp } from 'redux/store/signUpSlice';
import ReCapcha from 'components/common/ReCapcha';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PassWordInput from './PassWordInput';

function Info() {
  const [isCapcha, setIsCapcha] = useState(false);
  const dispatch = useDispatch();
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({ mode: 'onChange' });

  const { t } = useTranslation();

  const onFormSubmit = async (userInfo) => {
    if (isCapcha && isValid) {
      dispatch(reqSignUp({ userInfo, navigate }));
    }
  };

  const onChange = async (value) => {
    if (value) setIsCapcha(true);

    const token = captchaRef.current.getValue();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/post`, { token })
      .then((res) => {
        console.log(res.data);
        if (res.data) setIsCapcha(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onErrors = () => console.error(errors);

  const nameText = t('label.userinfo.name');
  const joinText = t('label.userinfo.join');

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div>
          <label htmlFor="firstName">
            {nameText}
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register('firstName', {
                required: t('validation.require', { require: nameText })
              })}
            />
          </label>
          {errors.firstName && <small role="alert">{errors.firstName.message}</small>}
          <label htmlFor="lastName">
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register('lastName', {
                required: t('validation.require', { require: 'lastName' })
              })}
            />
          </label>
          {errors.lastName && <small role="alert">{errors.lastName.message}</small>}
        </div>
        <PassWordInput />
        {/* <div>
        {natText}
        <select
          {...register('nation', {
            required: t('signup.auth.require', { require: natText })
          })}
        >
          <option value="">--Select Nation--</option>
          <option value="us">US</option>
          <option value="kor">South Korea</option>
        </select>
        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
      </div> */}
        <ReCapcha setIsCapcha={setIsCapcha} />
        <button type="submit" onClick={onFormSubmit}>
          {joinText}
        </button>
      </form>
    </FormProvider>
  );
}

export default Info;
