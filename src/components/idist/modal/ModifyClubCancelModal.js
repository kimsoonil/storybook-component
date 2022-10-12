import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { getClubInit } from 'redux/idistStore/clubSlice';

const ModifyClubCancelModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visible = useSelector((state) => state.adminModal.modifyClubCancel?.visible);
  const clubId = useSelector((state) => state.adminModal.modifyClubCancel?.data);

  const onClickSubmit = useCallback(() => {
    dispatch(getClubInit({ id: clubId }));
    dispatch(hideModal({ type: 'modifyClubCancel' }));
  }, [clubId]);

  return <AdminModal title={AVD.modalText.modifyCancel} visible={visible} onClickSubmit={onClickSubmit} />;
};

export default ModifyClubCancelModal;
