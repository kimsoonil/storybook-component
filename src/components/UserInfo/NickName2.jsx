import React, { useState } from 'react';
import { NICKNAME_STATUS_INIT, NICKNAME_STATUS_CHANGE, NICKNAME_STATUS_SAVED } from 'constants/type';

function InitNickName({ setStatus }) {
  return (
    <div className="form_wrap">
      <span className="form_cell form_input input_lg between">
        <span className="nickname_set">
          <input
            type="text"
            title="input default"
            id="input_text"
            aria-invalid="false"
            defaultValue="Superclub=1004#FGS2G"
            readOnly="readonly"
          />
        </span>
        <button type="button" className="btn primary button_lg" onClick={() => setStatus(NICKNAME_STATUS_CHANGE)}>
          <span>Change Nickname</span>
        </button>
      </span>
    </div>
  );
}

function SaveNickName({ setStatus }) {
  return (
    <div className="form_wrap">
      <span className="form_cell form_input msg input_lg align">
        <div className="num01">
          <input
            type="text"
            title="input default"
            id="input_text"
            aria-invalid="false"
            placeholder="Please enter your Nickname"
          />
          <span className="guide_text num">
            <span>0</span>/20
          </span>
        </div>
        <div className="num02">
          <input
            type="text"
            className="nopadding"
            title="input default"
            id="input_text"
            aria-invalid="false"
            defaultValue="#FGS2G"
            disabled
          />
        </div>
        <button type="button" className="btn primary button_lg" onClick={() => setStatus(NICKNAME_STATUS_SAVED)}>
          <span>Save Nickname</span>
        </button>
      </span>
    </div>
  );
}

function CompleteNickName() {
  return (
    <div className="form_wrap">
      <span className="form_cell form_input msg input_lg fix_nick">
        <input
          type="text"
          title="input default"
          id="input_text"
          aria-invalid="false"
          defaultValue="kitty$1004#FGS2G"
          readOnly="readonly"
        />
        <span className="fix_ico" />
      </span>
      <div className="toast default show">
        <span>Your nickname changed successfully.</span>
      </div>
    </div>
  );
}

function GuideMessage({ status }) {
  return (
    <ul className="guide">
      <li style={{ display: status === NICKNAME_STATUS_INIT ? 'inline-block' : 'none' }}>
        Try changing the temporary nickname automatically specified when you sign up.
      </li>
      <li>
        You can change your nickname <span>only once</span>, so please think carefully before deciding.
      </li>
      <li style={{ display: status === NICKNAME_STATUS_CHANGE ? 'inline-block' : 'none' }}>
        Nicknames can be <span>up to 16 bytes</span> and only be entered in English, Korean, Chinese, Japanese, and some
        special characters. ~ ! @ # $ % ^ &amp; * ( ) _ + = , . &lt; &gt; ?
      </li>
    </ul>
  );
}
function GetNickStatus({ status, setStatus }) {
  if (status === NICKNAME_STATUS_INIT) return <InitNickName setStatus={setStatus} />;
  if (status === NICKNAME_STATUS_CHANGE) return <SaveNickName setStatus={setStatus} />;
  if (status === NICKNAME_STATUS_SAVED) return <CompleteNickName />;
}
function NickName2() {
  const [nickStatus, setNickStatus] = useState(NICKNAME_STATUS_INIT);
  return (
    <div className="layer">
      {/* 계정정보 변경 및 등록시에는 상하의 다른 레이어들을 block처리하여 다른버튼이 눌리지 않게 구현.
      (UI상 화면에 노출되지만 위에 막이 씌어져서 클릭이 되지 않는 형태로 구현해주세요)            
      <div class="layer_block"></div> 
    */}
      <div className="nickname">
        <h4 className="h4Type eng">Nickname</h4>
        <GetNickStatus status={nickStatus} setStatus={setNickStatus} />
        <GuideMessage status={nickStatus} />
      </div>
    </div>
  );
}

export default NickName2;
