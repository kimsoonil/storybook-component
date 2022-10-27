import React from 'react';

function Sns({ visibleInfo }) {
  return (
    <div className="layer">
      {/* 계정정보 변경 및 등록시에는 상하의 다른 레이어들을 block처리하여 다른버튼이 눌리지 않게 구현.
      (UI상 화면에 노출되지만 위에 막이 씌어져서 클릭이 되지 않는 형태로 구현해주세요)             
      <div class="layer_block"></div>
    */}
      {visibleInfo && <div className="layer_block" />}
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
              <span>adasdfsafargsfsdfsdfsfh@gmail.com</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sns;
