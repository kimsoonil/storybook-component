/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function ModalBanWord({ isShowModal, setIsShowBanModal }) {
  return (
    <div style={{ display: isShowModal ? 'inline-block' : 'none' }}>
      <div id="modal" />
      <div className="modal_popup modal_text" style={{ width: 480 }}>
        <div className="modal_con reason">
          <button type="button" className="close" onClick={() => setIsShowBanModal(false)} />
          <h2 className="modal_title">Reasons for Ban</h2>
          <div className="bg_con ">
            <div className="forum_reason_title">Enter a reason to ban this member.</div>
            <div className="text_area">
              <textarea placeholder="Please enter a reason to ban" defaultValue="" />
              <span className="num">
                <span className="black">0</span>/20
              </span>
            </div>
          </div>
          <div className="popup_btn_wrap right">
            <button type="button" className="btn default button_lg">
              <span>cancel</span>
            </button>
            <button type="button" className="btn primary button_lg">
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBanWord;
