import React from 'react';
import 'assets/scss/component/dialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BVD } from 'views/Admin/Boards';
import { deleteBoardGroupInit } from 'redux/idistStore/boardGroupSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import AlertDialog from './AlertDialog';

function DeleteGroupDialog({ submit }) {
  const dispatch = useDispatch();
  const deleteGroupData = useSelector((state) => state.adminDialog.deleteGroup);

  const onSubmit = () => {
    dispatch(
      deleteBoardGroupInit({
        id: deleteGroupData.id,
        actionList: [{ type: getBoardGroupsInit.type, payload: { id: deleteGroupData.clubId } }]
      })
    );
    submit?.();
  };

  return (
    <AlertDialog type="deleteGroup" open={!!deleteGroupData} submit={onSubmit} title={BVD.modalText.deleteGroup} />
  );
}

export default DeleteGroupDialog;
