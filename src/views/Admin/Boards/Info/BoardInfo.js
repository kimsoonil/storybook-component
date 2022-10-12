import React, { useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useDispatch, useSelector } from 'react-redux';

import { getBoardInit, patchBoardInit, patchBoardMergeInit } from 'redux/idistStore/boardSlice';
import _ from 'lodash';
import { BVD } from '../index';
import ActivationInput from 'views/Admin/Boards/Info/ActivationInput';
import NameInput from 'views/Admin/Boards/Info/NameInput';
import DescriptionInput from 'views/Admin/Boards/Info/DescriptionInput';
import PermissionInput from 'views/Admin/Boards/Info/PermissionInput';
import ViewModeInput from 'views/Admin/Boards/Info/ViewModeInput';
import Submit from 'views/Admin/Boards/Info/Submit';
import { getClubBoardGroupsInit } from 'redux/idistStore/clubSlice';

const BoardInfo = ({ clubId }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.admin?.boards?.selected);

  useEffect(() => {
    if (selected.id > 0) {
      dispatch(getBoardInit({ id: selected.id }));
    }
  }, [selected.id]);

  const isLoading = useSelector((state) => state.board.isLoading);
  const boardState = useSelector((state) => state.board.board);
  const board = useMemo(() => boardState?.data, [boardState?.data]);
  const boardGroups = useSelector((state) => state.club?.boardGroups?.data);
  const boardGroutId = useMemo(() => board?.board_group, [board?.board_group]);
  const boardList = useMemo(
    () => boardGroups?.find((boardGroup) => boardGroup.id === boardGroutId)?.boards,
    [boardGroups, boardGroutId]
  );

  const boardType = useMemo(
    () =>
      board?.name === 'All' || board?.name === 'Notice' || board?.name === 'Event' || board?.name === 'Member'
        ? 'default'
        : board?.name === 'Video' || board?.name === 'Gallery'
        ? 'media'
        : 'none',
    [board?.name]
  );
  const activationDisabled = useMemo(() => boardType === 'default', [boardType]);
  const nameDisabled = useMemo(() => boardType === 'default' || boardType === 'media', [boardType]);

  const [name, setName] = useState('');
  const handleChangeName = (name) => {
    setName(name);
  };

  const [activationLabel, setActivationLabel] = useState('');
  const handleActivationChange = (e) => {
    setActivationLabel(e.target.value);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (description) => {
    setDescription(description);
  };

  const [permission, setPermission] = useState({
    read: '',
    write: '',
    readGrade: '',
    writeGrade: ''
  });
  const handlePermissionChange = (permission) => {
    setPermission((prev) => ({ ...prev, ...permission }));
  };

  const [viewMode, setViewMode] = useState('');
  const handleViewModeChange = (viewMode) => {
    setViewMode(viewMode);
  };

  // init
  useEffect(() => {
    board && init(board);
  }, [board]);

  const init = (board) => {
    setActivationLabel(board.is_active ? BVD.activation.activation : BVD.activation.deactivation);
    setName(board.name);
    setDescription(board?.description || '');
    const initialPermission = {};

    if (permission === 'text') {
      // read 권한이 gradeList(브론즈 ~ 레전드 사이)에 있으면 read는 MEMBER, readGrade는 board.readPermission
      // if (BVD.permission.gradeList.find((grade) => grade.key === board.readPermission)) {
      //   initialPermission.read = BVD.permission.staff.MEMBER;
      //   initialPermission.readGrade = board.readPermission;
      // } else {
      //   initialPermission.read = board.readPermission || BVD.permission.staff.GUEST;
      //   initialPermission.readGrade = BVD.permission.grade.BRONZE;
      // }
      // if (BVD.permission.gradeList.find((grade) => grade.key === board.writePermission)) {
      //   initialPermission.write = BVD.permission.staff.MEMBER;
      //   initialPermission.writeGrade = board.writePermission;
      // } else {
      //   initialPermission.write = board.writePermission || BVD.permission.staff.GUEST;
      //   initialPermission.writeGrade = BVD.permission.grade.BRONZE;
      // }
    } else {
      if (board.read_permission > 0 && board.read_permission < 7) {
        initialPermission.read = BVD.permission.staff.MEMBER;
        initialPermission.readGrade =
          BVD.permission.apiList.find((item) => item.value === board.read_permission)?.type ||
          BVD.permission.grade.BRONZE;
      } else {
        initialPermission.read =
          BVD.permission.apiList.find((item) => item.value === board.read_permission)?.type ||
          BVD.permission.staff.GUEST;
        initialPermission.readGrade = BVD.permission.grade.BRONZE;
      }
      if (board.write_permission > 0 && board.write_permission < 7) {
        initialPermission.write = BVD.permission.staff.MEMBER;
        initialPermission.writeGrade =
          BVD.permission.apiList.find((item) => item.value === board.write_permission)?.type ||
          BVD.permission.grade.BRONZE;
      } else {
        initialPermission.write =
          BVD.permission.apiList.find((item) => item.value === board.write_permission)?.type ||
          BVD.permission.staff.GUEST;
        initialPermission.writeGrade = BVD.permission.grade.BRONZE;
      }
    }

    setPermission(initialPermission);
    setViewMode(board.view_mode || BVD.viewMode.type.list);
  };

  const onClickCancel = () => {
    if (confirm('취소하시겠습니까?', 'ok', 'cancel') && board) {
      dispatch(getBoardInit({ id: selected.id }));
    }
  };

  const onClickDelete = () => {
    if (confirm('하위에 게시글이 있는지?', 'ok', 'cancel')) {
      const promptValue = prompt('어떤 보드에 병합할까요?');
      const id = BoardList?.find((boardItem) => boardItem.name === promptValue)?.id;
      if (id) {
        console.log({ id: board.id, data: { id } });
        dispatch(
          patchBoardMergeInit({
            id: board.id,
            data: { id },
            actionList: [{ type: getClubBoardGroupsInit.type, payload: { id: clubId } }]
          })
        );
      } else {
        confirm('보드 이름을 다시 한번 확인해주세요');
      }
    } else {
      confirm('정말로 삭제하시겠습니까?', 'ok', 'cancel');
    }
  };

  const onClickSave = () => {
    const canNextStep =
      board.is_active &&
      activationLabel === BVD.activation.deactivation &&
      confirm('정말로 비활성화 하시겠습니까?', 'ok', 'cancel');

    if (canNextStep) {
      const readPermission =
        permission.read === BVD.permission.staff.MEMBER
          ? BVD.permission.apiList.find((item) => item.type === permission.readGrade)?.value
          : BVD.permission.apiList.find((item) => item.type === permission.read)?.value;
      const writePermission =
        permission.write === BVD.permission.staff.MEMBER
          ? BVD.permission.apiList.find((item) => item.type === permission.writeGrade)?.value
          : BVD.permission.apiList.find((item) => item.type === permission.write)?.value;

      confirm('저장하시겠습니까?', 'ok', 'cancel') &&
        dispatch(
          patchBoardInit({
            id: board?.id,
            data: {
              name,
              description,
              read_permission: readPermission,
              write_permission: writePermission,
              view_mode: viewMode,
              is_active: activationLabel === BVD.activation.activation
            },
            actionList: [
              { type: getClubBoardGroupsInit.type, payload: { id: clubId } },
              { type: getBoardInit.type, payload: { id: board?.id } }
            ]
          })
        );
    }
  };

  const hasChanged = true;
  // isDefault ||
  // name === '' ||
  // JSON.stringify({ name, is_active: activationLabel === BVD.activation.activation }) ===
  //   JSON.stringify({ name: boardGroup.name, is_active: boardGroup.is_active });

  if (isLoading || boardState.message !== 'ok') {
    return (
      <div>
        <div className="boards-contents" />
        <Submit isDefault={boardType !== 'none'} />
      </div>
    );
  }
  return (
    <div>
      <div className="boards-contents ">
        <ActivationInput
          activationLabel={activationLabel}
          onChange={handleActivationChange}
          disabled={activationDisabled}
        />
        <NameInput name={name} onChange={handleChangeName} disabled={nameDisabled} />
        <DescriptionInput description={description} onChange={handleDescriptionChange} />
        <PermissionInput permission={permission} onChange={handlePermissionChange} boardType={boardType} />
        <ViewModeInput viewMode={viewMode} onChange={handleViewModeChange} />
      </div>

      <Submit
        isDefault={boardType !== 'none'}
        onClickCancel={onClickCancel}
        cancelDisabled={false}
        // cancelDisabled={hasChanged}
        onClickDelete={onClickDelete}
        onClickSave={onClickSave}
        saveDisabled={false}
        // saveDisabled={hasChanged}
      />
    </div>
  );
};

export default BoardInfo;
