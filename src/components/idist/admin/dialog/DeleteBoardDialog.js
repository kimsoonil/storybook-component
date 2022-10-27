/* eslint-disable */
import React from 'react';
import 'assets/scss/component/dialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import AlertDialog from './AlertDialog';
import { BVD } from 'views/Admin/Boards';
import { deleteBoardInit } from 'redux/idistStore/boardSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';

const DeleteBoardDialog = ({ submit }) => {
  const dispatch = useDispatch();
  const deleteBoardData = useSelector((state) => state.adminDialog.deleteBoard);

  const _submit = () => {
    dispatch(
      deleteBoardInit({
        id: deleteBoardData.id,
        actionList: [{ type: getBoardGroupsInit.type, payload: { id: deleteBoardData.clubId } }]
      })
    );
    submit?.();
  };

  return (
    <AlertDialog type={'deleteBoard'} open={!!deleteBoardData} submit={_submit} title={BVD.modalText.deleteBoard} />
  );
};

export default DeleteBoardDialog;

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
