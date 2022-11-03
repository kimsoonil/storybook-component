/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
import { reqChangeNickname } from 'redux/store/common/changeNicknameSlice';
// import { useTranslation } from 'react-i18next';
import { updateNicknameStatus } from 'redux/store/common/logInSlice';
import {
  NICKNAME_STATUS_INIT,
  NICKNAME_STATUS_CHANGE,
  NICKNAME_STATUS_SAVED,
  POPUP_TYPE_NICKNAME_CONFIRM
} from 'constants/type';
import { showPopup } from 'redux/store/common/popupSlice';

function InitNickname({ nickname, tag, setStatus }) {
  return (
    <div className="form_wrap">
      <span className="form_cell form_input input_lg between">
        <span className="nickname_set">
          <input
            type="text"
            title="input default"
            id="input_text"
            aria-invalid="false"
            defaultValue={`${nickname}#${tag}`}
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

function SaveNickname({ tag, newNick, setNewNick, onEditNickname, errors }) {
  const NICKNAME_MAXLENGTH = 20;
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
            maxLength={NICKNAME_MAXLENGTH}
            value={newNick}
            onChange={(e) => setNewNick(e.target.value)}
          />
          <span className="guide_text num">
            <span>{newNick?.length}</span>/20
          </span>
        </div>
        <div className="num02">
          <input
            type="text"
            className="nopadding"
            title="input default"
            id="input_text"
            aria-invalid="false"
            defaultValue={tag}
            disabled
          />
        </div>
        <button type="button" className="btn primary button_lg" onClick={onEditNickname}>
          <span>Save Nickname</span>
        </button>
        {errors.nickName && <small role="alert">{errors.nickName}</small>}
      </span>
    </div>
  );
}

function CompleteNickname({ nickname, tag }) {
  return (
    <div className="form_wrap">
      <span className="form_cell form_input msg input_lg fix_nick">
        <input
          type="text"
          title="input default"
          id="input_text"
          aria-invalid="false"
          defaultValue={`${nickname}#${tag}`}
          readOnly="readonly"
        />
        <span className="fix_ico" />
      </span>
      {/* <div className="toast default show">
        <span>Your nickname changed successfully.</span>
      </div> */}
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

function NickName({ user, visibleInfo, nickStatus, setNickStatus }) {
  const { nickname, tag } = user;
  // const [nickStatus, setNickStatus] = useState(status);
  const [newNick, setNewNick] = useState('');
  const [errors, setErrors] = useState({ nickName: '' });
  const { accountInfo, error } = useSelector((state) => ({ ...state.changeNickname }));
  const { isConfirm } = useSelector((state) => ({ ...state.popup }));

  const dispatch = useDispatch();
  // const { t } = useTranslation();

  const onEditNickname = () => {
    console.log('onEditNickname');
    dispatch(showPopup({ type: POPUP_TYPE_NICKNAME_CONFIRM, contents: `${newNick}#${tag}` }));
  };

  useEffect(() => {
    if (isConfirm && newNick) {
      dispatch(reqChangeNickname({ nickname: newNick }));
    }
  }, [isConfirm]);

  // 변경 실패
  useEffect(() => {
    if (error !== '') setErrors({ nickName: error });
  }, [error]);

  // nickname update 됐을 경우 login에 상태변경
  useEffect(() => {
    if (!accountInfo.nickname_is_new && newNick) {
      setNickStatus(NICKNAME_STATUS_SAVED);
      dispatch(updateNicknameStatus());
    }
  }, [accountInfo.nickname_is_new]);

  return (
    <div className="layer">
      {visibleInfo && <div className="layer_block" />}
      <div className="nickname">
        <h4 className="h4Type eng">Nickname</h4>
        {nickStatus === NICKNAME_STATUS_INIT && (
          <InitNickname nickname={nickname} tag={tag} setStatus={setNickStatus} />
        )}
        {nickStatus === NICKNAME_STATUS_CHANGE && (
          <SaveNickname
            tag={tag}
            newNick={newNick}
            setNewNick={setNewNick}
            onEditNickname={onEditNickname}
            errors={errors}
          />
        )}
        {nickStatus === NICKNAME_STATUS_SAVED && <CompleteNickname nickname={nickname} tag={tag} />}
        <GuideMessage status={nickStatus} />
      </div>
    </div>
  );
}

export default NickName;
