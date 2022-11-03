import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { getBoardGroupInit, patchBoardGroupInit } from 'redux/idistStore/boardGroupSlice';
import { BVD } from 'views/Admin/Boards';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';

function DeactiveGroupModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.deactiveGroup?.visible);
  const modalData = useSelector((state) => state.adminModal.deactiveGroup?.data);

  const onClickSubmit = () => {
    dispatch(
      patchBoardGroupInit({
        id: modalData?.boardGroupId,
        data: { is_active: false },
        actionList: modalData?.isGroupSelected
          ? [
              { type: getBoardGroupsInit.type, payload: { id: modalData?.clubId } },
              { type: getBoardGroupInit.type, payload: { id: modalData?.boardGroupId } }
            ]
          : [{ type: getBoardGroupsInit.type, payload: { id: modalData?.clubId } }]
      })
    );
    dispatch(hideModal({ type: 'deactiveGroup' }));
  };

  return <AdminModal title={BVD.modalText.deactivationList} visible={visible} onClickSubmit={onClickSubmit} />;
}

export default DeactiveGroupModal;
