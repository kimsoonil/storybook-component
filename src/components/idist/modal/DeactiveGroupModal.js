import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { getClubBoardGroupsInit } from 'redux/idistStore/clubSlice';
import { getBoardGroupInit, patchBoardGroupInit } from 'redux/idistStore/boardGroupSlice';
import { BVD } from 'views/Admin/Boards';

const DeactiveGroupModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visible = useSelector((state) => state.adminModal.deactiveGroup?.visible);
  const modalData = useSelector((state) => state.adminModal.deactiveGroup?.data);

  const onClickSubmit = () => {
    dispatch(
      patchBoardGroupInit({
        id: modalData?.boardGroupId,
        data: { is_active: false },
        actionList: modalData?.isGroupSelected
          ? [
              { type: getClubBoardGroupsInit.type, payload: { id: modalData?.clubId } },
              { type: getBoardGroupInit.type, payload: { id: modalData?.boardGroupId } }
            ]
          : [{ type: getClubBoardGroupsInit.type, payload: { id: modalData?.clubId } }]
      })
    );
    dispatch(hideModal({ type: 'deactiveGroup' }));
  };

  return <AdminModal title={BVD.modalText.deactivationList} visible={visible} onClickSubmit={onClickSubmit} />;
};

export default DeactiveGroupModal;
