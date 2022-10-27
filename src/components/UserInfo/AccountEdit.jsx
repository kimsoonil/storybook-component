import React from 'react';
import { VERIFY_SEND_TYPE_CHANGE } from 'constants/type';
import AuthConfirm from 'components/SignUp/AuthConfirm';

function AccountEdit({ user }) {
  const { email, phone } = user;
  return (
    <div className="account">
      <div className="form_wrap">
        <label className="account_label">Account ID</label>
        <span className="form_cell form_input input_lg between">
          <span className="account_set">
            <input
              type="text"
              title="input default"
              id="input_text"
              aria-invalid="false"
              defaultValue={email}
              readOnly="readonly"
            />
          </span>
          <button type="button" className="btn primary_line button_lg">
            <span>Change Password</span>
          </button>
        </span>
      </div>
      <AuthConfirm verifyType={VERIFY_SEND_TYPE_CHANGE} formWrapClass="account" />
      <div className="form_wrap">
        <label className="account_label">Cellphone</label>
        <div className="HGroup">
          <span className="form_cell form_input input_md default flex tel">
            <div className="select_wrap">
              <div className="select tel">
                <div className="selected">
                  <div className="selected-value">+82</div>
                  <button type="button" className="arrow">
                    <span className="a11y">선택</span>
                  </button>
                </div>
                <ul>
                  <li className="option">82</li>
                  <li className="option">010</li>
                  <li className="option">011</li>
                  <li className="option">016</li>
                  <li className="option">017</li>
                  <li className="option">018</li>
                  <li className="option">019</li>
                </ul>
              </div>
            </div>
            <div className="input_set">
              <input
                type="text"
                title="input default"
                id="input_text"
                aria-invalid="false"
                placeholder="Please enter your phone number"
                defaultValue={phone}
              />
              <button className="btn_reset">
                <span className="a11y">삭제</span>
              </button>
            </div>
            <button type="button" className="btn primary button_md" disabled>
              <span>Authenticate</span>
            </button>
          </span>
        </div>
        {/* 휴대폰전화 등록번호
  <span class="form_cell email form_input input_md default between">
    <div class="input_set">
      <input type="text" title="input default" id="input_text" aria-invalid="false" value="082  010 - 2345 - 6789" disabled>
        <button class="btn_reset">
          <span class="a11y">삭제</span>
        </button>
    </div>
    <button type="button" class="btn primary button_md">
      <span>Authenticate</span>
    </button>
  </span>
        */}
        {/* 휴대폰등록 인증번호 입력
  <span class="form_cell email form_input input_md between hidden">
    <div class="input_set">
      <input type="text" title="input default" id="input_text" aria-invalid="false" placeholder="Authentication code">
        <span class="guide_text time">
          <span>2:59</span>
        </span>
    </div>
    <button type="button" class="btn primary button_md" disabled>
      <span>Confirm</span>
    </button>
  </span>
  <span class="error_txt msg" id="input_alert">Authentication completed!</span>
        */}
      </div>
      <div className="form_wrap">
        <label className="account_label">Marketing Receipt Consent</label>
        <div className="HGroup toggle">
          <span className="form_cell type_toggle">
            <span>SMS</span>
            <input type="checkbox" id="check10" defaultChecked />
            <label htmlFor="check10" />
          </span>
          <span className="form_cell type_toggle">
            <span>E-mail</span>
            <input type="checkbox" id="check10" defaultChecked />
            <label htmlFor="check10" />
          </span>
        </div>
      </div>
      <ul className="guide">
        <li>If you agree to receive marketing, you can receive various event information from the super club.</li>
      </ul>
      <div className="page_btn_wrap full">
        <button type="button" className="btn primary button_xl">
          <span>Save your Account</span>
        </button>
      </div>
    </div>
  );
}

export default AccountEdit;
