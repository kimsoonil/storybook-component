import React from 'react';
import classNames from 'classnames';

function PassWordInputBtn({ status, statusFunc }) {
  return (
    <button type="button" className={classNames('btn_input', 'eyes', { show: status })} onClick={statusFunc}>
      <span className="a11y">비밀번호 표시</span>
    </button>
  );
}

export default PassWordInputBtn;
