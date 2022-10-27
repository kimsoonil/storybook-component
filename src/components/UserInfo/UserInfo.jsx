/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { useTranslation } from 'react-i18next';

function UserInfo() {
  const { t } = useTranslation();
  const schema = {
    type: 'object',
    properties: {
      firstname: {
        type: 'string',
        minLength: 1,
        errorMessage: { minLength: t('signup.userinfo.firstname') }
      },
      lastname: {
        type: 'string',
        minLength: 1,
        errorMessage: { minLength: t('signup.userinfo.lastname') }
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 16,
        // pattern: '^[a-zA-Z0-9.!@#$%^*?_~]*$',
        pattern: '/(w)\\1\\1/',
        errorMessage: {
          minLength: t('signup.userinfo.password', { context: 'minLength' }),
          maxLength: t('signup.userinfo.password', { context: 'maxLength' }),
          pattern: t('signup.userinfo.password', { context: 'validSC1' })
        }
      },
      email: {
        type: 'string',
        pattern:
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        errorMessage: { pattern: t('signup.userinfo.email') }
      }
    },
    required: ['firstname', 'lastname', 'email'],
    additionalProperties: false
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: ajvResolver(schema)
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <input {...register('firstname')} />
        {errors.firstname && <span style={{ color: 'red' }}>{errors.firstname.message}</span>}
        <input {...register('lastname')} />
        {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname.message}</span>}
        <button type="submit">submit</button>
      </div>
      <div>
        <input
          {...register('password', {
            minLength: {
              value: 6,
              message: 'password error mmm'
            }
          })}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div>
      <div>
        <input {...register('email')} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>
    </form>
  );
}

export default UserInfo;
