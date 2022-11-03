import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { hideModal } from 'redux/idistStore/admin/modalSlice';

function SampleModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.sample?.visible);

  const onClickSubmit = () => {
    dispatch(hideModal({ type: 'warnBoardCount' }));
  };

  return (
    <AdminModal
      title="title"
      visible={visible}
      onClickSubmit={onClickSubmit}
      // close
      // hideCancel={}
      // hideSubmit
      // onClickCancel={}
    />
  );
}

export default SampleModal;
