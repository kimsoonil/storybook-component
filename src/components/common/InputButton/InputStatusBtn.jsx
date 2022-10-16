/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';

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
  useEffect(() => {
    console.log('isFocus', isFocus);
    console.log('isInputVal', isInputVal);
  }, [isFocus, isInputVal]);

  if (!isFocus && isInputVal.length > 0 && !errors) {
    return <SuccessBtn />;
  }
  if (isFocus === true && isInputVal.length > 0) {
    return <ResetBtn resetFunc={resetFunc} />;
  }
  return <></>;
}

export default InputStatusBtn;
