import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { getClubInit, patchClubInit } from 'redux/idistStore/clubSlice';

function ModifyClubModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.modifyClub?.visible);
  const club = useSelector((state) => state.adminModal.modifyClub?.data);

  const onClickSubmit = useCallback(() => {
    dispatch(
      patchClubInit({
        id: club.id,
        data: club,
        actionList: [{ type: getClubInit.type, payload: { id: club.id } }]
      })
    );
    dispatch(hideModal({ type: 'modifyClub' }));
  }, [club]);

  return <AdminModal title={AVD.modalText.modifySave} visible={visible} onClickSubmit={onClickSubmit} />;
}

export default ModifyClubModal;
