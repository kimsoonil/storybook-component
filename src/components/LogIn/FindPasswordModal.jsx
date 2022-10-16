/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import CommonInput from 'components/common/InputButton/CommonInput';

function FindPasswordModal({ isShowModal, setIsShowModal }) {
  const {
    getValues,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });
  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);

  const watchEmail = useWatch({ control, name: 'email', defaultValue: '' });

  return (
    <div style={{ display: isShowModal ? 'inline-block' : 'none' }}>
      <div id="modal" />
      <div className="modal_popup modal_text id_search">
        <div className="modal_con member">
          <button type="button" className="close" onClick={() => setIsShowModal(false)} />
          <h2 className="modal_title">Find Password</h2>
          <div className="bg_con">
            <div className="search_title">
              <span className="step">STEP 01</span>
              <span className="title_text">Search ID</span>
            </div>
            <div className="search_text">
              Please enter the email you first registered when signed up
              <br />
              to find your account.
            </div>
            {/* <div className="form_wrap msg error">
              <span className="form_cell form_input input_lg">
                <input
                  type="text"
                  title="input default"
                  id="input_text"
                  aria-invalid="false"
                  placeholder="E-mail account"
                />
                <div className="dot error">
                  <span className="a11y">실패</span>
                </div>
              </span>
              <span className="error_txt msg" id="input_error">
                Please enter your email.
              </span>
            </div> */}
            <CommonInput
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              errors={errors.email}
              inputVal={getValues('email')}
              placeholder="E-mail"
              resetFunc={() => setValue('email', '')}
              register={register('email', {
                required: t('validation.require', { require: 'email' }),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('validation.emailauth.email')
                }
              })}
            />
          </div>
          <div className="popup_btn_wrap right">
            <button type="button" className="btn default button_lg btn_close" onClick={() => setIsShowModal(false)}>
              <span>Cancel</span>
            </button>
            <button type="button" className="btn primary button_lg btn_close" disabled={errors.email || !watchEmail}>
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindPasswordModal;
