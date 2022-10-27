/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import classNames from 'classnames';

function SuccessBtn() {
  return (
    <div className="dot success">
      <span className="a11y">성공</span>
    </div>
  );
}

// function ResetBtn({ resetFunc }) {
//   const test = () => {
//     console.log(resetFunc);
//     resetFunc();
//   };
//   return (
//     <button className="btn_reset" onClick={test}>
//       <span className="a11y">삭제</span>
//     </button>
//   );
// }

function InputStatusBtn({ errors, isFocus, inputVal }) {
  // console.log(isFocus, inputVal, errors);
  if (!isFocus && inputVal && !errors) {
    return <SuccessBtn />;
  }
  return null;
}

function CommonInput({ isFocus, setIsFocus, errors, inputVal, placeholder, register }) {
  useEffect(() => {
    // console.log('isFocus::', isFocus);
  }, [isFocus]);
  return (
    <div
      className={classNames(
        'form_wrap',
        {
          msg: errors || (!errors && inputVal)
        },
        { error: errors },
        { success: !errors && inputVal }
      )}
      onBlur={() => setIsFocus(false)}
      onFocus={() => setIsFocus(true)}
    >
      <span className="form_cell form_input input_lg">
        <input type="text" aria-invalid="false" placeholder={placeholder} {...register} />
        <InputStatusBtn errors={errors} isFocus={isFocus} inputVal={inputVal} />
      </span>
      {errors && (
        <span className="error_txt msg" id="input_error">
          {errors.message}
        </span>
      )}
    </div>
  );
}

export default CommonInput;
