import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { postClubInit } from 'redux/idistStore/admin/commonAdminSlice';

function CreateClubModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.createClub?.visible);
  const modalData = useSelector((state) => state.adminModal.createClub?.data);

  const onClickSubmit = useCallback(() => {
    dispatch(postClubInit({ data: modalData }));
    dispatch(hideModal({ type: 'createClub' }));
    // navigate('/manage/dashboard');
    // console.log(modalData);
  }, [modalData]);

  return <AdminModal title={AVD.modalText.create} visible={visible} onClickSubmit={onClickSubmit} />;
}

export default CreateClubModal;
