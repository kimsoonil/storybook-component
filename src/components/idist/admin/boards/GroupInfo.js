/* eslint-disable */
import _ from 'lodash';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { boardGroupPayload, boardType } from 'redux/idistApi/model';
import {
  deleteBoardGroupInit,
  patchBoardGroupInit,
  postBoardGroupInit,
  setInfo
} from 'redux/idistStore/admin/boardAdminSlice';
import { IVD } from 'views/Admin';
import JButton from '../JButton';

const rootClassName = 'admin-boards-info';

const GroupInfo = ({ title, setTitle, setAddState }) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.boardAdmin.info);
  const { id: clubId } = useSelector((state) => state.commonAdmin.club);

  const [isActive, setIsActive] = useState(true);
  const [titleInputState, setTitleInputState] = useState(IVD.blur);

  const isDefault = useMemo(() => info?.type === boardType.DEFAULT, [info?.type]);
  const hasChanged = useMemo(
    () => !_.isEqual({ title, isActive }, { title: info?.title, isActive: info?.isActive }),
    [title, isActive, info]
  );

  useLayoutEffect(() => {
    setIsActive(info?.isActive);
    setTitle(info?.title);
  }, [info]);

  const activationClassName = useCallback(
    (isActive) =>
      isActive
        ? {
            button: rootClassName + '-activation-activate',
            icon: rootClassName + '-activation-activate-icon',
            label: rootClassName + '-activation-activate-label'
          }
        : {
            button: rootClassName + '-activation-deactivate',
            icon: rootClassName + '-activation-deactivate-icon',
            label: rootClassName + '-activation-deactivate-label'
          },
    []
  );

  const onClickActivation = useCallback((value) => {
    if (value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  const onClickMerge = useCallback(() => {
    confirm('팝업 띄우기');
    // 추가 중이면 처음 화면.

    // 수정 중이면 수정 초기 화면
  }, []);

  const onClickCancel = useCallback(() => {
    if (info?.id) {
      dispatch(setInfo({ ...info }));
    } else {
      setAddState(null);
      dispatch(setInfo(null));
    }
  }, [info]);

  const onClickDelete = useCallback(() => {
    dispatch(deleteBoardGroupInit({ id: info?.id }));
  }, [info?.id]);

  const onClickSave = useCallback(() => {
    if (info?.id) {
      dispatch(patchBoardGroupInit({ id: info?.id, data: boardGroupPayload({ title, isActive }) }));
    } else {
      dispatch(postBoardGroupInit({ id: clubId, data: boardGroupPayload({ title, isActive }) }));
      setAddState(null);
    }
  }, [info?.id, title, isActive]);

  return (
    <div className={`${rootClassName}`}>
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Activation</div>
        <div className={`${rootClassName}-label-description`}>If disable the group, cannot access this group.</div>

        <div className={`${rootClassName}-activation-container`}>
          <div className={`${activationClassName(isActive).button}`} onClick={() => onClickActivation(true)}>
            <div className={`${activationClassName(isActive).icon}`} />
            <div className={`${activationClassName(isActive).label}`}>Activation</div>
          </div>

          {!isDefault && (
            <div className={`${activationClassName(!isActive).button}`} onClick={() => onClickActivation(false)}>
              <div className={`${activationClassName(!isActive).icon}`} />
              <div className={`${activationClassName(!isActive).label}`}>Deactivation</div>
            </div>
          )}
        </div>
      </div>

      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Name</div>

        <div className={`${rootClassName}-name-container`}>
          <div className={`${rootClassName}-name-input`}>
            <div
              className={`${rootClassName}-name ${rootClassName}-name-${titleInputState} ${
                isDefault && `${rootClassName}-name-disabled`
              }`}
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={20}
                placeholder="Please enter a group name"
                onFocus={() => setTitleInputState(IVD.focus)}
                onBlur={() => {
                  if (!title) {
                    setTitleInputState(IVD.error);
                    return;
                  }
                  setTitleInputState(IVD.blur);
                }}
                disabled={isDefault}
              />
            </div>
            <div className={`${rootClassName}-name-length`}>{`${title.length || 0}/20`}</div>
          </div>

          {titleInputState === IVD.error && (
            <div className={`${rootClassName}-name-error-message`}>Please enter a group name.</div>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {!isDefault && info?.id && (
        <div className={`${rootClassName}-merge-wrapper`}>
          <JButton label={'Merge'} color="none" onClick={onClickMerge} />
        </div>
      )}

      <div className={`${rootClassName}-bottom-container`}>
        <JButton label={'Cancel'} color="none" outline onClick={onClickCancel} />
        {!isDefault && info?.id && <JButton label={'Delete'} color="none" outline onClick={onClickDelete} />}
        <JButton
          label={'Save'}
          disabled={!(title && titleInputState !== IVD.error) || !hasChanged}
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};

export default GroupInfo;
