import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';

const CreateClubCancelModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visible = useSelector((state) => state.adminModal.createClubCancel?.visible);

  const onClickSubmit = () => {
    dispatch(hideModal({ type: 'createClubCancel' }));
    navigate(-1);
  };

  return <AdminModal title={AVD.modalText.create} visible={visible} onClickSubmit={onClickSubmit} />;
};

export default CreateClubCancelModal;
