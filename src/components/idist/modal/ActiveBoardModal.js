import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { AVD } from 'views/Admin';
import { hideModal } from 'redux/idistStore/admin/modalSlice';

function ActiveBoardModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.activeBoard?.visible);

  const onClickSubmit = () => {
    dispatch(hideModal({ type: 'activeBoard' }));
  };

  return <AdminModal title={AVD.modalText.create} visible={visible} onClickSubmit={onClickSubmit} />;
}

export default ActiveBoardModal;
