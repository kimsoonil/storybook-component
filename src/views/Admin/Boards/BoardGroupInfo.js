import React, { useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useDispatch, useSelector } from 'react-redux';

import 'assets/scss/admin/boards.scss';
import { getIdBoardGroupInit, patchBoardGroupInit } from 'redux/store/boardGroupSlice';

import _ from 'lodash';
import { BVD } from './index';
import { admin as AVD } from 'constants/index';
import JButton from 'components/admin/JButton';

const BoardGroupInfo = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.admin?.boards?.selected);

  useEffect(() => {
    if (selected.id > 0) {
      console.log('board group api 호출');
      dispatch(getIdBoardGroupInit({ id: selected.id }));
    }
  }, [selected.id]);

  const boardGroupState = useSelector((state) => state.boardGroup);
  const { isLoading, boardGroup } = boardGroupState;

  // if (boardGroup?.data) {
  //   console.log('boardGroup : ', boardGroup?.data);
  // }

  const [state, setState] = useState({
    id: -1,
    club: -1,
    name: '',
    isActive: true
  });
  const [inputState, setInputState] = useState({
    name: AVD.inputStateEnum.NONE
  });

  // init
  useEffect(() => {
    boardGroup?.data && setState(boardGroup?.data);
  }, [boardGroup]);

  const handleActivationChange = (e) => {
    const isActive = e.target.value === 'Activation';
    if (confirm('전환하시겠습니까?', 'ok', 'cancel')) {
      setState((prev) => ({ ...prev, isActive }));
    }
  };

  const handleNameChange = (e) => {
    setState((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      validateName();
    }
  };
  const handleNameBlur = () => {
    validateName();
  };
  const validateName = () => {
    console.log('dispatch vaild check name: ', state.name);
    if (state.name === '') {
      setInputState((prev) => ({ ...prev, name: AVD.inputStateEnum.ERROR }));
    } else {
      setInputState((prev) => ({ ...prev, name: AVD.inputStateEnum.SUCCESS }));
    }
  };
  const handleNameFocus = () => {
    setInputState((prev) => ({ ...prev, name: AVD.inputStateEnum.FOCUS }));
  };

  const cancel = () => {
    confirm('취소하시겠습니까?', 'ok', 'cancel') && boardGroup?.data && setState(boardGroup?.data);
  };

  const save = () => {
    confirm('저장하시겠습니까?', 'ok', 'cancel') &&
      dispatch(
        patchBoardGroupInit({
          id: boardGroup.data.id,
          data: {
            name: state.name,
            isActive: state.isActive
          }
        })
      );
  };

  if (isLoading || boardGroup.message !== 'ok') {
    return null;
  }
  return (
    <div>
      <div className="boards-contents ">
        {/* Activation */}
        <div className="info-title">{BVD.activation.title}</div>
        <div className="info-desc">{BVD.activation.subtitle}</div>
        <div className="activation-radio-wrapper">
          {BVD.activation.list.map(({ label }, index) => (
            <div key={index} className="label-wrapper">
              <input
                type="radio"
                id={label}
                value={label}
                checked={state.isActive ? label === 'Activation' : label === 'Deactivation'}
                onChange={handleActivationChange}
              />
              <label htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>

        {/* Name */}
        <div className="name-wrapper">
          <div className="info-title">{BVD.name.title}</div>
          <div className="essential" />
        </div>
        <div
          className={`name-input-wrapper 
          ${inputState.name === AVD.inputStateEnum.ERROR && 'name-input-wrapper-error'} 
          ${inputState.name === AVD.inputStateEnum.SUCCESS && 'name-input-wrapper-success'} `}
        >
          <input
            className="itxt-placeholder"
            type={'text'}
            placeholder={BVD.name.placeholder}
            maxLength={20}
            value={state.name}
            onChange={handleNameChange}
            onKeyDown={handleNameKeyDown}
            onBlur={handleNameBlur}
            onFocus={handleNameFocus}
          />
          <div className="name-length">
            <div className="name-length-gray">{state.name.length}</div>/20
          </div>
        </div>
        {inputState.name === AVD.inputStateEnum.ERROR && <div className="name-error">{BVD.name.error}</div>}
      </div>

      {/* <div className="submit-button-wrapper">
        <div>cancel</div>
        <div>save</div>
      </div> */}

      <div className="submit-button-wrapper">
        <JButton label={'Cancel'} outline color={'none'} onClick={cancel} tabIndex={0} />
        <JButton
          label={'Save'}
          onClick={save}
          tabIndex={0}
          disabled={inputState.name === AVD.inputStateEnum.FOCUS || inputState.name === AVD.inputStateEnum.ERROR}
        />
      </div>
    </div>
  );
};

export default BoardGroupInfo;
