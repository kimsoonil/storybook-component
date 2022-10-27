/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_INFO_EMAIL } from 'constants/type';
import AuthConfirm from './AuthConfirm';

function AuthEmailPhone({ reqType = USER_INFO_EMAIL }) {
  const navigate = useNavigate();
  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm();
  const watchPrivacy = watch('privacy', false);
  const watchMarket = watch('market', false);

  const { t } = useTranslation();

  const onErrors = () => console.error(errors);

  return (
    <form onSubmit={handleSubmit(onErrors)}>
      <ul>
        <AuthConfirm reqType={reqType} />
        <li>
          <div>
            {t('label.privacy')}
            <input
              {...register('privacy')}
              name="privacy"
              value
              type="checkbox"
              onClick={() => setValue('privacy', !getValues('privacy'))}
            />
          </div>
        </li>
        <li>
          <div>
            <label htmlFor="email">
              {t('label.market')}
              <input
                {...register('market')}
                name="market"
                value
                type="checkbox"
                onClick={() => setValue('market', !getValues('market'))}
              />
            </label>
          </div>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/login')}>
            {t('label.emailauth.back')}
          </button>
          <button
            type="submit"
            onClick={() => navigate('/signup/info')}
            disabled={!(isConfirm && watchPrivacy && watchMarket) && 'disabled'}
          >
            {t('label.emailauth.signup')}
          </button>
        </li>
      </ul>
    </form>
  );
}

export default AuthEmailPhone;
