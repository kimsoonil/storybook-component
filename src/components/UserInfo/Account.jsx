import React from 'react';
import { NICKNAME_STATUS_CHANGE } from 'constants/type';
import AccountEdit from './AccountEdit';

function AccountInfo({ user }) {
  const { phone, email } = user;
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
          <button type="button" className="btn primary_line button_lg" disabled>
            <span>Change Password</span>
          </button>
        </span>
      </div>
      <div className="form_wrap">
        <label className="account_label">E-mail</label>
        <span className="form_cell form_input input_lg">
          <input
            type="text"
            title="input default"
            id="input_text"
            aria-invalid="false"
            defaultValue={email}
            readOnly="readonly"
          />
        </span>
      </div>
      <div className="form_wrap">
        <label className="account_label">Cellphone</label>
        <span className="form_cell form_input input_lg between">
          <input
            type="text"
            title="input default"
            id="input_text"
            aria-invalid="false"
            placeholder="Please register your cell phone number"
            readOnly="readonly"
            defaultValue={phone}
          />
        </span>
      </div>
      <div className="form_wrap">
        <label className="account_label">Marketing Receipt Consent</label>
        <div className="HGroup toggle">
          <span className="form_cell type_toggle">
            <span>SMS</span>
            <input type="checkbox" id="check10" defaultChecked disabled />
            <label htmlFor="check10" />
          </span>
          <span className="form_cell type_toggle">
            <span>E-mail</span>
            <input type="checkbox" id="check10" defaultChecked disabled />
            <label htmlFor="check10" />
          </span>
        </div>
      </div>
      <ul className="guide">
        <li>If you agree to receive marketing, you can receive various event information from the super club.</li>
      </ul>
      <div className="page_btn_wrap full">
        <button type="button" className="btn primary button_xl" disabled>
          <span>Save your Account</span>
        </button>
      </div>
    </div>
  );
}

function Account({ user, visibleInfo, setVisibleInfo, nickStatus }) {
  return (
    <div className="layer">
      <div className="account_title">
        <h4 className="h4Type eng">Account Infomation</h4>
        <button
          type="button"
          className="btn_modify"
          onClick={() => setVisibleInfo(!visibleInfo)}
          disabled={nickStatus === NICKNAME_STATUS_CHANGE}
        >
          <span>{visibleInfo ? 'Cancel' : 'Modify'}</span>
        </button>
      </div>
      {visibleInfo ? <AccountEdit user={user} /> : <AccountInfo user={user} />}
    </div>
  );
}

export default Account;
