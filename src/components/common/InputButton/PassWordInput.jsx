/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import PassWordInputBtn from 'components/common/InputButton/PassWordInputBtn';

function PassWordInput({ errors, isViewPwd, setIsViewPwd, register }) {
  return (
    <div className={classnames('form_wrap', 'msg', { error: errors })}>
      <span className="form_cell form_input input_lg">
        <input id="password" type={isViewPwd ? 'text' : 'password'} placeholder="Password" {...register} />
        <PassWordInputBtn status={isViewPwd} statusFunc={() => setIsViewPwd(!isViewPwd)} />
      </span>
      {errors && (
        <span className="error_txt msg" id="input_error">
          {errors.message}
        </span>
      )}
    </div>
  );
}

export default PassWordInput;
