/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function FindModal({ isShowModal, setIsShowModal }) {
  const [status, setStatus] = useState(1);
  const onHide = () => {
    setIsShowModal(false);
  };
  return (
    <div style={{ display: isShowModal ? 'inline-block' : 'none' }}>
      <div id="modal" />
      <div className="modal_popup modal_text id_search">
        <div className="modal_con member">
          <button type="button" className="close" onClick={onHide} />
          <h2 className="modal_title">Find Password</h2>
          {status === 1 && <Step1 setStatus={setStatus} onHide={onHide} />}
          {status === 2 && <Step2 setStatus={setStatus} onHide={onHide} />}
          {status === 3 && <Step3 onHide={onHide} />}
        </div>
      </div>
    </div>
  );
}

export default FindModal;
