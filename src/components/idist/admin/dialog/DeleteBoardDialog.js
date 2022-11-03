import React from 'react';
import 'assets/scss/component/dialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BVD } from 'views/Admin/Boards';
import { deleteBoardInit } from 'redux/idistStore/boardSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import AlertDialog from './AlertDialog';

function DeleteBoardDialog({ submit }) {
  const dispatch = useDispatch();
  const deleteBoardData = useSelector((state) => state.adminDialog.deleteBoard);

  const onSubmit = () => {
    dispatch(
      deleteBoardInit({
        id: deleteBoardData.id,
        actionList: [{ type: getBoardGroupsInit.type, payload: { id: deleteBoardData.clubId } }]
      })
    );
    submit?.();
  };

  return (
    <AlertDialog type="deleteBoard" open={!!deleteBoardData} submit={onSubmit} title={BVD.modalText.deleteBoard} />
  );
}

export default DeleteBoardDialog;
