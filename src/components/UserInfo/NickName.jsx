/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { reqEditNickName } from 'redux/store/nickNameSlice';
import { reqCheckNickName } from 'redux/store/checkNickNameSlice';
import { useTranslation } from 'react-i18next';

function NickName({ nickStatus, nick }) {
  const { isChangeable, message } = useSelector((state) => ({ ...state.nickName }));
  const { isAvailable, checkNickMessage } = useSelector((state) => ({ ...state.checkNickName }));
  const [isNickChangeable, setIsNickChangeable] = useState(nickStatus);
  const [isConfirm, setIsConfirm] = useState(false);
  const {
    register,
    getValues,
    setError,
    setValue,
    trigger,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onCheckNickName = () => dispatch(reqCheckNickName({ nickName: getValues('nickName') }));
  const onEditNickName = () => dispatch(reqEditNickName({ nickName: getValues('nickName') }));

  useEffect(() => {
    if (message !== '') setError('nickName', message);
  }, [message]);

  useEffect(() => {
    setIsNickChangeable(isChangeable);
    if (!isChangeable) setIsConfirm(false);
  }, [isChangeable]);

  useEffect(() => {
    if (isAvailable) setIsConfirm(isAvailable);
    else setError('nickName', { message: checkNickMessage });
  }, [isAvailable, checkNickMessage]);

  return (
    <>
      <div>
        <label htmlFor="nickName">
          <input
            id="nickName"
            type="text"
            // aria-invalid={chgCnt > 0}
            defaultValue={nick}
            {...register('nickName', {
              required: t('validation.require', { require: 'nickName' })
            })}
            disabled={!isNickChangeable}
            onClick={() => setValue('nickName', '')}
          />
          <div style={{ visibility: isNickChangeable ? 'visible' : 'hidden' }}>
            <button
              type="button"
              onClick={async () => {
                const result = await trigger('nickName');
                if (result) onCheckNickName();
              }}
              disabled={!isNickChangeable && 'disabled'}
            >
              {t('label.account.change')}
            </button>
          </div>
        </label>
        {errors.nickName && <small role="alert">{errors.nickName.message}</small>}
        <ul>
          <li style={{ visibility: isNickChangeable ? 'visible' : 'hidden' }}>
            Try changing the temporary nickname automatically assigned when creating an account to a nickname with your
            own color.
          </li>
          <li>You can change your nickname only once for the first time, so please think carefully before deciding.</li>
        </ul>
      </div>
      {message}
      <div style={{ visibility: isConfirm ? 'visible' : 'hidden' }}>
        <h3>Once a nickname has been changed, it cannot be changed again. Do you want to change your nickname?</h3>
        <button type="button" onClick={() => setIsConfirm(false)}>
          {t('label.emailauth.back')}
        </button>
        <button
          type="button"
          onClick={async () => {
            const result = await trigger('nickName');
            if (result) onEditNickName();
          }}
        >
          {t('label.emailauth.confirm')}
        </button>
      </div>
    </>
  );
}

export default NickName;
