/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { showPopup } from 'redux/store/common/popupSlice';
import useCheckBoxAll from 'hook/useCheckBoxAll';
import Footer from 'components/common/footer/Footer';
import Header from 'components/common/header/Header';
import { POPUP_TYPE_PRIVACY_POLICY, POPUP_TYPE_MARKET_POLICY } from 'constants/type';
import { reqAuthSns, signUpAfterAutoLogin } from 'redux/store/common/logInSlice';
import { setStorage } from 'util/storage';

function Terms() {
  const { isAuthSns } = useSelector((state) => ({ ...state.logIn }));
  // const { t } = useTranslation();
  // const checkboxLists = [
  //   {
  //     id: t('label.privacy'),
  //     content: t('label.terms.contents', { context: 'privacy' })
  //   },
  //   { id: t('label.market'), content: t('label.terms.contents', { context: 'market' }) }
  // ];
  const checkboxLists = [
    {
      id: 'privacy',
      content: 'By creating on account you agree to Super club’s Privacy Policy and Terms of use.'
    },
    { id: 'market', content: 'By creating on account you agree to Super club’s Marketing policies' }
  ];
  const [checkedList, checkAll, checkOne] = useCheckBoxAll(checkboxLists);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const onTermsPopup = (type) => {
    // const popupType = type === t('label.privacy') ? POPUP_TYPE_PRIVACY_POLICY : POPUP_TYPE_MARKET_POLICY;
    const popupType = type === 'privacy' ? POPUP_TYPE_PRIVACY_POLICY : POPUP_TYPE_MARKET_POLICY;
    dispatch(showPopup({ type: popupType }));
  };

  const snsLogin = () => {
    dispatch(reqAuthSns(params.snsType));
  };

  useEffect(() => {
    console.log('isAuthSns Terms:::', isAuthSns);
    if (isAuthSns) {
      window.addEventListener('message', (e) => {
        if (e.data.message === 'passport-login-success' && e.data.source === 'platform-login-api') {
          console.log(e.data.data);
          const { platforms, authToken, userInfo } = e.data.data;
          console.log('platforms::', platforms);
          setStorage('accessToken', authToken);
          setStorage(params.snsType, 'true');
          dispatch(signUpAfterAutoLogin({ navigate, accessToken: authToken, userInfo }));
          // if (accessToken) dispatch(signUpAfterAutoLogin({ navigate, accessToken, userInfo }));
          navigate('/signup/snscomplete');
          // window.localStorage.setItem('token', e.data.data.authToken);
          // e.data.data.platforms: 바인딩된 플랫폼 배열 (ccr, google, apple, facebook, twitter)
          // e.data.data.userInfo
        }
      });
    }
  }, [isAuthSns]);

  useEffect(() => {
    console.log('checkedList:', checkedList);
  }, [checkedList]);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="login_wrap">
            <div className="signup">
              <h3 className="h3Type eng">TERMS OF SERVICE</h3>
              <span>
                You need to agree to the terms of use and personal
                <br />
                information collection for use of the service.
              </span>
            </div>
            <div className="terms_agree">
              <div className="form_wrap join_check">
                <span className="form_cell form_check">
                  <input
                    id="all"
                    value="all"
                    type="checkbox"
                    checked={checkedList.length === checkboxLists.length ?? false}
                    onChange={(e) => checkAll(e.target.checked)}
                  />
                  <label htmlFor="all" className="checkbox">
                    <span>Everyone agrees</span>
                  </label>
                </span>
              </div>
            </div>
            <ul className="check_list depth2">
              {checkboxLists.map((list) => (
                <li key={list.id}>
                  <div className="form_wrap join_check">
                    <span className="form_cell form_check">
                      <input
                        id={list.id}
                        value={list.id}
                        type="checkbox"
                        checked={checkedList.find((element) => element.id === list.id) ?? false}
                        onChange={(e) => checkOne(e.target.checked, list)}
                      />
                      <label htmlFor={list.id} className="checkbox">
                        <span>
                          By creating an account you agree to SUPER CLUB’s
                          <br />
                          <button onClick={() => onTermsPopup(list.id)} className="color">
                            <span>{list.id}</span>
                          </button>
                          &nbsp;and&nbsp;
                          <button onClick={() => onTermsPopup(list.id)} className="color">
                            <span>Terms of Use</span>
                          </button>
                          .
                        </span>
                      </label>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="page_btn_wrap half agree">
              <button type="button" className="btn default button_xl" onClick={() => navigate('/signup')}>
                {/* <span>{t('label.terms.disagree')}</span> */}
                <span>Disagree</span>
              </button>
              <button
                type="button"
                className="btn primary button_xl"
                disabled={checkedList?.findIndex((item) => item.id === 'privacy') === -1}
                onClick={snsLogin}
              >
                {/* <span>{t('label.terms.agree')}</span> */}
                <span>Agree</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Terms;
