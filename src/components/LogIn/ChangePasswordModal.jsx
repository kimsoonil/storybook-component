/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import PassWordInput from 'components/SignUp/PassWordInput';

function ChangePasswordModal({ isShowModal, setIsShowModal }) {
  const {
    register,
    control,
    trigger,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const watchPassword = useWatch({ control, name: 'password', defaultValue: '' });
  const watchcfrPassword = useWatch({ control, name: 'cfrPassword', defaultValue: '' });

  const onChangePassWord = () => {
    console.log('watchPassword:', watchPassword);
    console.log('watchcfrPassword:', watchcfrPassword);
    setIsShowModal(false);
  };

  useEffect(() => {
    if (!isShowModal) {
      setValue('password', '');
      setValue('cfrPassword', '');
      clearErrors(['password', 'cfrPassword']);
    }
  }, [isShowModal]);
  return (
    <div style={{ display: isShowModal ? 'inline-block' : 'none' }}>
      <div id="modal" />
      <div className="modal_popup modal_text id_search">
        <div className="modal_con member">
          <button type="button" className="close" onClick={() => setIsShowModal(false)} />
          <h2 className="modal_title">Find Password</h2>
          <div className="bg_con">
            <div className="search_title">
              <span className="step">STEP 03</span>
              <span className="title_text">Change Password</span>
            </div>
            <div className="search_text nopadding">
              Please enter 8 to 16 digits using a combination of English’s uppercase letters, lowercase letters,
              numbers, and special characters.
            </div>
            <PassWordInput control={control} register={register} trigger={trigger} errors={errors} />
          </div>
          <div className="popup_btn_wrap full">
            <button type="button" className="btn primary button_lg btn_close" onClick={onChangePassWord}>
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
