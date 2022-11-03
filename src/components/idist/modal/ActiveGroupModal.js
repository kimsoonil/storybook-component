import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import { getBoardGroupInit, patchBoardGroupInit } from 'redux/idistStore/boardGroupSlice';

function ActiveGroupModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.activeGroup?.visible);
  const modalData = useSelector((state) => state.adminModal.activeGroup?.data);

  const onClickSubmit = () => {
    dispatch(
      patchBoardGroupInit({
        id: modalData?.boardGroupId,
        data: { isActive: true },
        actionList: modalData?.isGroupSelected
          ? [
              { type: getBoardGroupsInit.type, payload: { id: modalData?.clubId } },
              { type: getBoardGroupInit.type, payload: { id: modalData?.boardGroupId } }
            ]
          : [{ type: getBoardGroupsInit.type, payload: { id: modalData?.clubId } }]
      })
    );
    dispatch(hideModal({ type: 'activeGroup' }));
  };

  return <AdminModal title="이런 모달 없나?" visible={visible} onClickSubmit={onClickSubmit} />;
}

export default ActiveGroupModal;
