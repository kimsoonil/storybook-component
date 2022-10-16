import React, { useState } from 'react';
import classNames from 'classnames';

function SuccessBtn() {
  return (
    <div className="dot success">
      <span className="a11y">성공</span>
    </div>
  );
}

function ResetBtn({ resetFunc }) {
  return (
    <button className="btn_reset" onClick={resetFunc}>
      <span className="a11y">삭제</span>
    </button>
  );
}

function InputStatusBtn({ errors, isFocus, isInputVal, resetFunc }) {
  if (!isFocus && isInputVal.length > 0 && !errors) {
    return <SuccessBtn />;
  }
  if (isFocus === true && isInputVal.length > 0) {
    return <ResetBtn resetFunc={resetFunc} />;
  }
  return null;
}

function CommonInput({ errors, isInputVal, resetFunc }) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={classNames(
        'form_wrap',
        {
          msg: errors || (!errors && isInputVal)
        },
        { error: errors },
        { success: !errors && isInputVal }
      )}
    >
      <span className="form_cell form_input input_lg">
        <input type="text" aria-invalid="false" onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} />
        <InputStatusBtn errors={errors} isFocus={isFocus} isInputVal={isInputVal} resetFunc={resetFunc} />
      </span>
      {errors && (
        <span className="error_txt msg" id="input_error">
          {errors}
        </span>
      )}
    </div>
  );
}

export default CommonInput;
