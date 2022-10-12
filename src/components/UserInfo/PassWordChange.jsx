/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AuthConfirm from 'components/SignUp/SignUp/AuthConfirm';
import PassWordInput from 'components/SignUp/PassWordInput';
import { reqChangePassword } from 'redux/store/changePasswordSlice';

import { USER_INFO_EDIT, USER_INFO_EMAIL, USER_INFO_PHONE } from 'constants/type';

function PassWordChange({ email, phoneNumber }) {
  const [pwd, setPwd] = useState('');
  const [menu, setMenu] = useState({
    list: [`${USER_INFO_EMAIL}_chg`, `${USER_INFO_PHONE}_chg`],
    selected: `${USER_INFO_EMAIL}_chg`
  });
  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));
  const methods = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reqType = menu.selected.indexOf(USER_INFO_EMAIL) === -1 ? USER_INFO_PHONE : USER_INFO_EMAIL;
  const onChangePassWord = () => dispatch(reqChangePassword({ password: pwd }));

  return (
    <FormProvider {...methods}>
      <form>
        {menu.list?.map((value) => (
          <div key={value}>
            <input
              value={value}
              name="platform"
              type="radio"
              checked={menu.selected === value}
              onChange={(e) => setMenu({ ...menu, selected: e.target.value })}
            />
            {value}
          </div>
        ))}
        <AuthConfirm reqType={reqType} editType={USER_INFO_EDIT} />
        <PassWordInput isDisabled={isConfirm} setPwd={setPwd} email={email} phoneNumber={phoneNumber} />
        <button type="button" onClick={() => onChangePassWord()} disabled={!(isConfirm && pwd !== '') && 'disabled'}>
          {t('label.emailauth.auth')}
        </button>
      </form>
    </FormProvider>
  );
}

export default PassWordChange;
