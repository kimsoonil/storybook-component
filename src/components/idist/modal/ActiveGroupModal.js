import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { BVD } from 'views/Admin/Boards';

const ActiveGroupModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visible = useSelector((state) => state.adminModal.activeGroup?.visible);
  const modalData = useSelector((state) => state.adminModal.activeGroup?.data);

  const onClickSubmit = () => {
    dispatch(
      patchBoardGroupInit({
        id: modalData?.boardGroupId,
        data: { isActive: true },
        actionList: modalData?.isGroupSelected
          ? [
              { type: getClubBoardGroupsInit.type, payload: { id: modalData?.clubId } },
              { type: getBoardGroupInit.type, payload: { id: modalData?.boardGroupId } }
            ]
          : [{ type: getClubBoardGroupsInit.type, payload: { id: modalData?.clubId } }]
      })
    );
    dispatch(hideModal({ type: 'activeGroup' }));
  };

  return <AdminModal title={'이런 모달 없나?'} visible={visible} onClickSubmit={onClickSubmit} />;
};

export default ActiveGroupModal;
