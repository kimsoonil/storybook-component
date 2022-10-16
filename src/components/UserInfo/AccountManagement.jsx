/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_INFO_EMAIL, USER_INFO_PASSWORD } from 'constants/type';
import { reqAccountInfo } from 'redux/store/common/accountInfoSlice';
import { reqDeleteSnsId } from 'redux/store/common/deleteSnsIdSlice';
import useToggle from 'hook/useToggle';
import AuthAccount from 'components/UserInfo/AuthAccount';
import PassWordChange from './PassWordChange';
import NickName from './NickName';

function AccountManagement() {
  const { userId } = useSelector((state) => ({ ...state.userInfo }));
  const { email, phoneNumber, nickName, snsId, isChangeable } = useSelector((state) => ({ ...state.accountInfo }));
  const [isModify, setIsModify] = useToggle();
  const [accountMenu, setAccountMenu] = useState(USER_INFO_EMAIL);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(reqAccountInfo({ userId }));
  }, []);

  return (
    <>
      <div>
        <Link to="/signup/account/edit">Account Management</Link>
      </div>
      <div>
        <Link to="/signup/wallet/edit">Wallet Management</Link>
      </div>
      <h3>Nickname</h3>
      <NickName nickStatus={isChangeable} nick={nickName} />
      <div>
        <h3>Account information and connect</h3>
        <button type="button" onClick={setIsModify}>
          {t('label.confirm')}
        </button>
      </div>
      <div style={{ visibility: isModify ? 'visible' : 'hidden' }}>
        <button onClick={() => setAccountMenu(USER_INFO_EMAIL)}>Account</button>
        <button onClick={() => setAccountMenu(USER_INFO_PASSWORD)}>Change Password</button>
        {accountMenu === USER_INFO_EMAIL ? <AuthAccount /> : <PassWordChange email={email} phoneNumber={phoneNumber} />}
      </div>
      <div>
        <ul>
          {snsId?.map((value) => (
            <li key={value.type}>
              <h3>
                {value.type}
                {value.id}
              </h3>
              <button onClick={() => dispatch(reqDeleteSnsId({ snsId: value.id }))}>disconnect</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AccountManagement;
