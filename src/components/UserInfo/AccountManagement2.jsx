import React from 'react';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import NickName from './NickName2';

function AccountManagement2() {
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container" className="subpage">
          <div className="sidemenu" />
          <div className="content">
            <h3 className="h3Type eng center">ACCOUNT SETTING</h3>
            {/* Nickname */}
            <NickName />
            {/* Account Infomation Modify */}
            <div className="layer">
              <div className="layer_block" />
              <div className="account_title">
                <h4 className="h4Type eng">Account Infomation</h4>
                <button type="button" className="btn_modify">
                  <span>Modify</span>
                </button>
              </div>
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
                        defaultValue="superclub@ccr.co.kr"
                        readOnly="readonly"
                      />
                    </span>
                    <button type="button" className="btn primary_line button_lg">
                      <span>Change Nickname</span>
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
                      defaultValue="superclub@ccr.co.kr"
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
                  <li>
                    If you agree to receive marketing, you can receive various event information from the super club.
                  </li>
                </ul>
                <div className="page_btn_wrap full">
                  <button type="button" className="btn primary button_xl" disabled>
                    <span>Save your Account</span>
                  </button>
                </div>
              </div>
            </div>
            {/* SNS Interworking */}
            <div className="layer">
              {/* 계정정보 변경 및 등록시에는 상하의 다른 레이어들을 block처리하여 다른버튼이 눌리지 않게 구현.
      (UI상 화면에 노출되지만 위에 막이 씌어져서 클릭이 되지 않는 형태로 구현해주세요)             
      <div class="layer_block"></div>
    */}
              <h4 className="h4Type eng">SNS Interworking</h4>
              <div className="interworking">
                <span className="inter_text">Log in easily by connecting to your SNS account.</span>
                <ul className="sns_list">
                  <li className="google connect">
                    <dl>
                      <dt className="logo" />
                      <dd className="join_date connect des eng">2022-09-22</dd>
                    </dl>
                    <button type="button" className="btn primary button_xs">
                      <span>Connecting</span>
                    </button>
                    <div className="connect_leyer">
                      <span>adasdfsafargsfsdfsdfsfsfsdfesgsdrthdtyjtyh@gmail.com</span>
                    </div>
                  </li>
                  <li className="twitter connect">
                    <dl>
                      <dt className="logo" />
                      <dd className="join_date connect des eng">2022-09-22</dd>
                    </dl>
                    <button type="button" className="btn primary button_xs">
                      <span>Connecting</span>
                    </button>
                    <div className="connect_leyer">
                      <span>adasdfsafargsfsdfsdfsfsfsdfesgsdrthdtyjtyh@gmail.com</span>
                    </div>
                  </li>
                  <li className="facebook connect">
                    <dl>
                      <dt className="logo" />
                      <dd className="join_date connect des eng">2022-09-22</dd>
                    </dl>
                    <button type="button" className="btn primary button_xs">
                      <span>Connecting</span>
                    </button>
                    <div className="connect_leyer">
                      <span>adasdfsafargsfsdfsdfsfsfsdfesgsdrthdtyjtyh@gmail.com</span>
                    </div>
                  </li>
                  <li className="apple connect">
                    <dl>
                      <dt className="logo" />
                      <dd className="join_date connect des eng">2022-09-22</dd>
                    </dl>
                    <button type="button" className="btn primary button_xs">
                      <span>Connecting</span>
                    </button>
                    <div className="connect_leyer">
                      <span>adasdfsafargsfsdfsdfsfsfsdfesgsdrthdtyjtyh@gmail.com</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button type="button" className="btn_topmove">
            <span className="a11y">최상위로 이동</span>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AccountManagement2;
