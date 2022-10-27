/* eslint-disable */
import React from 'react';
import 'assets/scss/component/dialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import AlertDialog from './AlertDialog';
import { BVD } from 'views/Admin/Boards';
import { deleteBoardGroupInit } from 'redux/idistStore/boardGroupSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';

const DeleteGroupDialog = ({ submit }) => {
  const dispatch = useDispatch();
  const deleteGroupData = useSelector((state) => state.adminDialog.deleteGroup);

  const _submit = () => {
    dispatch(
      deleteBoardGroupInit({
        id: deleteGroupData.id,
        actionList: [{ type: getBoardGroupsInit.type, payload: { id: deleteGroupData.clubId } }]
      })
    );
    submit?.();
  };

  return (
    <AlertDialog type={'deleteGroup'} open={!!deleteGroupData} submit={_submit} title={BVD.modalText.deleteGroup} />
  );
};

export default DeleteGroupDialog;

{
  /* <Dialog
open={open}
onClose={close}
aria-describedby="alert-dialog-description"
aria-labelledby="alert-dialog-title"
>
<DialogTitle>{title}</DialogTitle>
{subtitle && (
  <DialogContent>
    <DialogContentText>{subtitle}</DialogContentText>
  </DialogContent>
)}
<DialogActions>
  <Button onClick={onClickCancel}>No</Button>
  <Button onClick={onClickSubmit}>Yes</Button>
</DialogActions>
</Dialog> */
}
