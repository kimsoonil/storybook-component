/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import CommonInput from 'components/common/InputButton/CommonInput';
// import { useSelector } from 'react-redux';
// import { hidePopup } from 'redux/store/common/popupSlice';
// import { reqSearchEmail } from 'redux/store/common/searchEmailSlice';
// import { reset as authEmailReset, reqAuthEmail } from 'redux/store/common/authEmailSlice';
// import { VERIFY_SEND_SOURCE_EMAIL, VERIFY_SEND_TYPE_CHANGE } from 'constants/type';

function Step1({ setStatus, onHide }) {
  const {
    getValues,
    register,
    setValue,
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const watchEmail = useWatch({ control, name: 'email', defaultValue: '' });

  // const dispatch = useDispatch();
  const onSearch = () => {
    // dispatch(
    //   reqAuthEmail({
    //     email: getValues('email'),
    //     verify_source: VERIFY_SEND_SOURCE_EMAIL,
    //     verify_type: VERIFY_SEND_TYPE_CHANGE
    //   })
    // );

    setStatus(2);
  };

  // useEffect(() => {
  //   if (watchEmail && errors.email) setStatus(2);
  // }, [watchEmail]);

  return (
    <>
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
        <button type="button" className="btn default button_lg btn_close" onClick={onHide}>
          <span>Cancel</span>
        </button>
        <button
          type="button"
          className="btn primary button_lg btn_close"
          disabled={errors.email || !watchEmail}
          onClick={onSearch}
        >
          <span>Next</span>
        </button>
      </div>
    </>
  );
}

export default Step1;
