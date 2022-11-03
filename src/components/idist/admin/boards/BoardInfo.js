import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardPayload, boardPermissionType, boardType, viewModeType } from 'redux/idistApi/model';
import { deleteBoardInit, patchBoardInit, postBoardInit, setInfo } from 'redux/idistStore/admin/boardAdminSlice';
import _ from 'lodash';
import { IVD } from 'views/Admin';
import albumPreviewImage from 'images/admin/album-preview.svg';
import cardPreviewImage from 'images/admin/card-preview.svg';
import listPreviewImage from 'images/admin/list-preview.svg';

import albumActiveIcon from 'images/admin/ic-viewmode-album-active.svg';
import albumDefaultIcon from 'images/admin/ic-viewmode-album.svg';
import listActiveIcon from 'images/admin/ic-viewmode-list-active.svg';
import listDefaultIcon from 'images/admin/ic-viewmode-list.svg';
import cardActiveIcon from 'images/admin/ic-viewmode-card-active.svg';
import cardDefaultIcon from 'images/admin/ic-viewmode-card.svg';

import PermissionSelector from './PermissionSelector';
import JButton from '../JButton';

const rootClassName = 'admin-boards-info';

function BoardInfo({ title, setTitle, setAddState }) {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.boardAdmin.info);

  const [isActive, setIsActive] = useState(true);
  const [titleInputState, setTitleInputState] = useState(IVD.blur);
  const [description, setDescription] = useState();

  const [readOption, setReadOption] = useState();
  const [readGradeOption, setReadGradeOption] = useState();
  const [writeOption, setWriteOption] = useState();
  const [writeGradeOption, setWriteGradeOption] = useState();

  const [viewMode, setViewMode] = useState();

  const isDefault = useMemo(() => info?.type === boardType.DEFAULT, [info?.type]);
  const isNormal = useMemo(() => info?.type === boardType.NORMAL, [info?.type]);

  useLayoutEffect(() => {
    setIsActive(info?.isActive);
    setTitle(info?.title);
    setDescription(info?.description || '');

    const readPermission = info?.readPermission;
    if (readPermission > 0 && readPermission < 7) {
      setReadOption({ value: 1, label: 'MEMBER' });
      setReadGradeOption({ value: readPermission, label: boardPermissionType[readPermission] });
    } else {
      setReadOption({ value: readPermission, label: boardPermissionType[readPermission] });
      setReadGradeOption({ value: 1, label: 'BRONZE' });
    }

    const writePermission = info?.writePermission;
    if (writePermission > 0 && writePermission < 7) {
      setWriteOption({ value: 1, label: 'MEMBER' });
      setWriteGradeOption({ value: writePermission, label: boardPermissionType[writePermission] });
    } else {
      setWriteOption({ value: writePermission, label: boardPermissionType[writePermission] });
      setWriteGradeOption({ value: 1, label: 'BRONZE' });
    }

    setViewMode(info?.viewMode);
  }, [info]);

  const onChangeReadOption = useCallback(
    (option) => {
      setReadOption(option);
      if (option.value > writeOption?.value) {
        setWriteOption(option);
      }
    },
    [writeOption?.value]
  );

  const onChangeReadGradeOption = useCallback(
    (option) => {
      setReadGradeOption(option);
      if (option.value > writeGradeOption?.value) {
        setWriteGradeOption(option);
      }
    },
    [writeGradeOption?.value]
  );

  const activationClassName = useCallback((value) => {
    if (value) {
      return {
        button: `${rootClassName}-activation-activate`,
        icon: `${rootClassName}-activation-activate-icon`,
        label: `${rootClassName}-activation-activate-label`
      };
    }
    return {
      button: `${rootClassName}-activation-deactivate`,
      icon: `${rootClassName}-activation-deactivate-icon`,
      label: `${rootClassName}-activation-deactivate-label`
    };
  }, []);

  const onClickActivation = useCallback((value) => {
    if (value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  const readOptions = useMemo(
    () => [
      { value: 0, label: 'GUEST' },
      { value: 1, label: 'MEMBER' },
      { value: 7, label: 'STAFF' }
    ],
    []
  );
  const readGradeOptions = useMemo(
    () => [
      { value: 1, label: 'BRONZE' },
      { value: 2, label: 'SILVER' },
      { value: 3, label: 'GOLD' },
      { value: 4, label: 'PLATINUM' },
      { value: 5, label: 'DIAMOND' },
      { value: 6, label: 'LEGEND' }
    ],
    []
  );
  const writeOptions = useMemo(() => readOptions.filter((item) => item.value >= readOption?.value), [readOption]);
  const writeGradeOptions = useMemo(
    () =>
      readOption?.value === 0
        ? readGradeOptions
        : readGradeOptions.filter((item) => item.value >= readGradeOption?.value),
    [readGradeOption, readOption]
  );

  const permissionModel = useMemo(() => {
    const ret = { readPermission: 0, writePermission: 0 };
    if (readOption?.value === 0 || readOption?.value === 7) {
      ret.readPermission = readOption?.value;
    } else {
      ret.readPermission = readGradeOption?.value;
    }
    if (writeOption?.value === 0 || writeOption?.value === 7) {
      ret.writePermission = writeOption?.value;
    } else {
      ret.writePermission = writeGradeOption?.value;
    }

    return ret;
  }, [readOption, readGradeOption, writeOption, writeGradeOption]);

  const viewModePreviewImage = useMemo(() => {
    if (viewMode === viewModeType.ALBUM) {
      return albumPreviewImage;
    }
    if (viewMode === viewModeType.CARD) {
      return cardPreviewImage;
    }
    return listPreviewImage;
  }, [viewMode]);

  const hasChanged = useMemo(
    () =>
      !_.isEqual(
        {
          title,
          isActive,
          description,
          ...permissionModel,
          viewMode
        },
        {
          title: info?.title,
          isActive: info?.isActive,
          description: info?.description || '',
          readPermission: info?.readPermission,
          writePermission: info?.writePermission,
          viewMode: info?.viewMode
        }
      ),
    [title, isActive, info, description, permissionModel, viewMode]
  );

  const onClickMerge = useCallback(() => {
    // const boardId = prompt('팝업 띄우기');
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
    dispatch(deleteBoardInit({ id: info?.id }));
  }, [info?.id]);

  const onClickSave = useCallback(() => {
    if (info?.id) {
      dispatch(
        patchBoardInit({
          id: info?.id,
          data: boardPayload({ title, isActive, description, ...permissionModel, viewMode })
        })
      );
    } else {
      dispatch(
        postBoardInit({
          id: info?.boardGroupId,
          data: boardPayload({ title, isActive, description, ...permissionModel, viewMode })
        })
      );
      setAddState(null);
    }
  }, [info?.id, title, isActive, description, permissionModel, viewMode]);

  return (
    <div className={`${rootClassName}`}>
      {/* Activation */}
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Activation</div>
        <div className={`${rootClassName}-label-description`}>If disable the board, cannot access this board.</div>

        <div className={`${rootClassName}-activation-container`}>
          <div
            className={`${activationClassName(isActive).button}`}
            onClick={() => onClickActivation(true)}
            onKeyDown={(e) => (e.key === 'Enter' ? onClickActivation(true) : {})}
            role="button"
            tabIndex="0"
          >
            <div className={`${activationClassName(isActive).icon}`} />
            <div className={`${activationClassName(isActive).label}`}>Activation</div>
          </div>

          {!isDefault && (
            <div
              className={`${activationClassName(!isActive).button}`}
              onClick={() => onClickActivation(false)}
              onKeyDown={(e) => (e.key === 'Enter' ? onClickActivation(false) : {})}
              role="button"
              tabIndex="0"
            >
              <div className={`${activationClassName(!isActive).icon}`} />
              <div className={`${activationClassName(!isActive).label}`}>Deactivation</div>
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Name</div>

        <div className={`${rootClassName}-name-container`}>
          <div className={`${rootClassName}-name-input`}>
            <div
              className={`${rootClassName}-name ${rootClassName}-name-${titleInputState} ${
                !isNormal && info?.id && `${rootClassName}-name-disabled`
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
                disabled={!isNormal && info?.id}
              />
            </div>
            <div className={`${rootClassName}-name-length`}>{`${title.length || 0}/20`}</div>
          </div>

          {titleInputState === IVD.error && (
            <div className={`${rootClassName}-name-error-message`}>Please enter a group name.</div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Description</div>

        <div className={`${rootClassName}-description-container`}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={160}
            placeholder="Please write a board description."
          />
          <div className={`${rootClassName}-description-length`}>{`${description?.length || 0}/160`}</div>
        </div>
      </div>

      {/* Permission */}
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>Permission</div>
        <div className={`${rootClassName}-label-description`}>
          The permission to view a post cannot be greater than the permission to create a post.
        </div>
        <div className={`${rootClassName}-permission-container`}>
          <div className={`${rootClassName}-permission`}>
            <div className={`${rootClassName}-permission-label`}>Read</div>
            <PermissionSelector
              options={readOptions}
              selectedOption={readOption}
              setSelectedOption={onChangeReadOption}
            />

            <div className={`${rootClassName}-permission-grade`}>Read Grade</div>
            <PermissionSelector
              isDisabled={readOption?.value !== 1}
              options={readGradeOptions}
              selectedOption={readOption?.value !== 1 ? { value: -1, label: '-' } : readGradeOption}
              setSelectedOption={onChangeReadGradeOption}
            />
          </div>

          <div className={`${rootClassName}-permission`}>
            <div className={`${rootClassName}-permission-label`}>Write</div>
            <PermissionSelector
              options={writeOptions}
              selectedOption={writeOption}
              setSelectedOption={(option) => setWriteOption(option)}
            />

            <div className={`${rootClassName}-permission-grade`}>Write Grade</div>
            <PermissionSelector
              isDisabled={writeOption?.value !== 1}
              options={writeGradeOptions}
              selectedOption={writeOption?.value !== 1 ? { value: -1, label: '-' } : writeGradeOption}
              setSelectedOption={(option) => setWriteGradeOption(option)}
            />
          </div>
        </div>
      </div>

      {/* View Mode */}
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-label`}>View mode</div>
        <div className={`${rootClassName}-label-description`}>You can set up your board in any format.</div>

        <div className={`${rootClassName}-view-mode-container`}>
          <ViewModeBox
            value={viewModeType.ALBUM}
            onClick={(e) => setViewMode(Number(e.currentTarget.id))}
            label="Album type"
            isActive={viewModeType.ALBUM === viewMode}
            description="Can view many images of the posts like a gallery"
            activeImage={albumActiveIcon}
            defaultImage={albumDefaultIcon}
          />

          <ViewModeBox
            value={viewModeType.LIST}
            onClick={(e) => setViewMode(Number(e.currentTarget.id))}
            label="List type"
            isActive={viewModeType.LIST === viewMode}
            description="Can view summaries of many posts like a blog"
            activeImage={listActiveIcon}
            defaultImage={listDefaultIcon}
          />

          <ViewModeBox
            value={viewModeType.CARD}
            onClick={(e) => setViewMode(Number(e.currentTarget.id))}
            label="Card type"
            isActive={viewModeType.CARD === viewMode}
            description="Can view post one by one larger like SNS"
            activeImage={cardActiveIcon}
            defaultImage={cardDefaultIcon}
          />
        </div>

        <div className={`${rootClassName}-view-mode-preview`}>
          <img src={viewModePreviewImage} alt="preview" />
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {isNormal && info?.id && (
        <div className={`${rootClassName}-merge-wrapper`}>
          <JButton label="Merge" color="none" onClick={onClickMerge} />
        </div>
      )}

      <div className={`${rootClassName}-bottom-container`}>
        <JButton label="Cancel" color="none" outline onClick={onClickCancel} />
        {isNormal && info?.id && <JButton label="Delete" color="none" outline onClick={onClickDelete} />}
        <JButton
          label="Save"
          disabled={!(title && titleInputState !== IVD.error) || !hasChanged}
          onClick={onClickSave}
        />
      </div>
    </div>
  );
}

export default BoardInfo;

function ViewModeBox({ value, onClick, label, isActive, description, activeImage, defaultImage }) {
  return (
    <div
      id={value}
      className={`${rootClassName}-view-mode-type ${isActive && `${rootClassName}-view-mode-type-active`}`}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick(e) : {})}
      role="button"
      tabIndex="0"
    >
      <div className={`${rootClassName}-view-mode-type-title`}>
        <img src={isActive ? activeImage : defaultImage} alt="icon" />
        {label}
      </div>
      <div className={`${rootClassName}-view-mode-type-description`}>{description}</div>
    </div>
  );
}
