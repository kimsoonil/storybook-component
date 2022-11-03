import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminModal from 'components/idist/modal/AdminModal';
import { hideModal } from 'redux/idistStore/admin/modalSlice';
import { BVD } from 'views/Admin/Boards';

function WarnGroupCountModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.adminModal.warnGroupCount?.visible);

  const onClickSubmit = () => {
    dispatch(hideModal({ type: 'warnGroupCount' }));
  };

  return (
    <AdminModal title={BVD.modalText.warnGroupCountList} visible={visible} onClickSubmit={onClickSubmit} hideCancel />
  );
}

export default WarnGroupCountModal;
