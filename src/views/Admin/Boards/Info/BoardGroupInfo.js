import React, { useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardGroupInit, patchBoardGroupInit, patchBoardGroupMergeInit } from 'redux/idistStore/boardGroupSlice';

import _ from 'lodash';
import { AVD, IVD } from 'views/Admin';
import JButton from 'components/idist/admin/JButton';
import useInput from 'hooks/useInput';
import NameInput from './NameInput';
import { BVD } from '../index';
import ActivationInput from './ActivationInput';
import { getClubBoardGroupsInit } from 'redux/idistStore/clubSlice';
import Submit from './Submit';

function BoardGroupInfo({ clubId }) {
  const dispatch = useDispatch();
  // const selected = { id: -1, type: 0 };
  const selected = useSelector((state) => state.admin?.boards?.selected);

  useEffect(() => {
    if (selected.id > 0) {
      console.log('board group api 호출');
      dispatch(getBoardGroupInit({ id: selected.id }));
    }
  }, [selected.id]);

  const isLoading = useSelector((state) => state.boardGroup.isLoading);
  const boardGroupState = useSelector((state) => state.boardGroup.boardGroup);
  const boardGroup = useMemo(() => boardGroupState?.data, [boardGroupState?.data]);
  const isDefault = useMemo(() => boardGroup?.name === 'Basic', [boardGroup?.name]);

  const boardGroups = useSelector((state) => state.club?.boardGroups?.data);
  const hasBoard = useMemo(
    () => !!boardGroups?.find((item) => item.id === boardGroup?.id)?.boards?.[0],
    [boardGroups, boardGroup?.id]
  );

  const [activationLabel, setActivationLabel] = useState('');
  const handleActivationChange = (e) => {
    setActivationLabel(e.target.value);
  };

  const [name, setName] = useState('');
  const onChangeName = (name) => {
    setName(name);
  };

  // init
  useEffect(() => {
    boardGroup && init(boardGroup);
  }, [boardGroup]);
  const init = (boardGroup) => {
    setActivationLabel(boardGroup.is_active ? BVD.activation.activation : BVD.activation.deactivation);
    setName(boardGroup.name);
  };

  const onClickCancel = () => {
    if (confirm('취소하시겠습니까?', 'ok', 'cancel') && boardGroup) {
      dispatch(getBoardGroupInit({ id: selected.id }));
      // init(boardGroup);
    }
  };

  const onClickDelete = () => {
    // console.log('하위에 보드가 있느냐? : ', hasBoard);
    if (hasBoard) {
      const promptValue = prompt('어떤 그룹에 병합할까요?');
      const id = boardGroups?.find((boardGroupItem) => boardGroupItem.name === promptValue)?.id;
      if (id) {
        console.log({ id: boardGroup.id, data: { id } });
        dispatch(
          patchBoardGroupMergeInit({
            id: boardGroup.id,
            data: { id },
            actionList: [{ type: getClubBoardGroupsInit.type, payload: { id: clubId } }]
          })
        );
      }
    } else {
      confirm('정말로 삭제하시겠습니까?', 'ok', 'cancel');
    }
  };

  const onClickSave = () => {
    boardGroup.is_active &&
      activationLabel === BVD.activation.deactivation &&
      confirm('정말로 비활성화 하시겠습니까?', 'ok', 'cancel');
    confirm('저장하시겠습니까?', 'ok', 'cancel') &&
      dispatch(
        patchBoardGroupInit({
          id: boardGroup?.id,
          data: {
            name,
            is_active: activationLabel === BVD.activation.activation
          },
          actionList: [
            { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
            {
              type: getBoardGroupInit.type,
              payload: { id: boardGroup.id }
            }
          ]
        })
      );
  };
  const hasChanged =
    isDefault ||
    name === '' ||
    JSON.stringify({ name, is_active: activationLabel === BVD.activation.activation }) ===
      JSON.stringify({ name: boardGroup.name, is_active: boardGroup.is_active });

  if (isLoading || boardGroupState.message !== 'ok') {
    return (
      <div>
        <div className="boards-contents" />
        <Submit />
      </div>
    );
  }
  return (
    <div>
      <div className="boards-contents ">
        <ActivationInput activationLabel={activationLabel} onChange={handleActivationChange} disabled={isDefault} />
        <NameInput name={name} onChange={onChangeName} disabled={isDefault} />
      </div>

      <Submit
        isDefault={isDefault}
        onClickCancel={onClickCancel}
        cancelDisabled={hasChanged}
        onClickDelete={onClickDelete}
        onClickSave={onClickSave}
        saveDisabled={hasChanged}
      />
    </div>
  );
}

export default BoardGroupInfo;
