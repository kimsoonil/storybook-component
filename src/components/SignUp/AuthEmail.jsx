/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { showPopup } from 'redux/store/common/popupSlice';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Footer from 'components/common/footer/Footer';
import Header from 'components/common/header/Header';
import AuthConfirm2 from 'components/SignUp/AuthConfirm3';
import { POPUP_TYPE_PRIVACY_POLICY, POPUP_TYPE_MARKET_POLICY } from 'constants/type';

function AuthEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isConfirm } = useSelector((state) => ({ ...state.authCode }));

  const { register, getValues, setValue, watch } = useForm();
  const watchPrivacy = watch('privacy', false);
  const watchMarket = watch('market', false);

  const { t } = useTranslation();

  const onTermsPopup = (type) => {
    const popupType = type === t('label.privacy') ? POPUP_TYPE_PRIVACY_POLICY : POPUP_TYPE_MARKET_POLICY;
    dispatch(showPopup({ type: popupType }));
  };

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="login_wrap">
            <div className="signup">
              <h3 className="h3Type eng">SIGN UP</h3>
              <span>
                Please proceed with email authentication first to
                <br />
                register as a member.
              </span>
            </div>
            <AuthConfirm2 />
            {/* 성공했을 시 버튼없이 Input만 나오는 상태 
  <div class="form_wrap msg btn_set success">          
    <span class="form_cell form_input input_md">
      <input type="text" title="input default" id="input_text" aria-invalid="false" value="superclub@ccr.co.kr">                          
      <div class="dot success">
        <span class="a11y">성공</span>
      </div>
    </span>
    <span class="success_txt msg" id="input_alert">Authentication completed!</span>
  </div>
  */}
            <ul className="check_list depth1">
              <li>
                <div className="form_wrap join_check">
                  <span className="form_cell form_check">
                    <input
                      type="checkbox"
                      id="privacy"
                      {...register('privacy')}
                      onClick={() => setValue('privacy', !getValues('privacy'))}
                    />
                    <label htmlFor="privacy" className="checkbox">
                      <span>
                        By creating an account you agree to SUPER CLUB’s
                        <br />
                        <button type="button" className="color" onClick={() => onTermsPopup('privacy')}>
                          <span>Privacy Policy</span>
                        </button>{' '}
                        and{' '}
                        <button type="button" className="color" onClick={() => onTermsPopup('privacy')}>
                          <span>Terms of Use</span>
                        </button>
                        .
                      </span>
                    </label>
                  </span>
                </div>
              </li>
              <li>
                <div className="form_wrap join_check">
                  <span className="form_cell form_check">
                    <input
                      type="checkbox"
                      id="market"
                      {...register('market')}
                      onClick={() => setValue('market', !getValues('market'))}
                    />
                    <label htmlFor="market" className="checkbox">
                      <span>
                        By creating an account you agree to SUPER CLUB’s
                        <br />
                        <button type="button" className="color" onClick={() => onTermsPopup('market')}>
                          <span>Marketing Policies</span>
                        </button>
                        .
                      </span>
                    </label>
                  </span>
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="btn primary button_xl join_next"
              onClick={() => navigate('/signup/info')}
              disabled={!(isConfirm && watchPrivacy && watchMarket)}
            >
              <span>Next</span>
            </button>
            <div className="join_link">
              <span>Already a membership?</span>
              <button type="button" className="color" onClick={() => navigate('/login')}>
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AuthEmail;
