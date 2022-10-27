import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllDialog, closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import PropTypes from 'prop-types';
import JButton from '../JButton';
import { BVD } from 'views/Admin/Boards';
import { patchBoardMergeInit } from 'redux/idistStore/boardSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';

const MergeBoardDialog = ({ submit }) => {
  const dispatch = useDispatch();
  const mergeBoardData = useSelector((state) => state.adminDialog.mergeBoard);
  const boards = useMemo(() => mergeBoardData?.boards || [], [mergeBoardData?.boards]);

  const [targetBoard, setTargetBoard] = useState(null);
  const onTargetBoardChange = useCallback((e) => {
    setTargetBoard(e.target.value);
  }, []);

  useEffect(() => {
    if (boards.length > 0) {
      setTargetBoard(boards[0]?.id);
    } else {
      setTargetBoard(null);
    }
  }, [boards]);

  const close = () => {
    dispatch(closeDialog('mergeBoard'));
  };
  const onClickSubmit = () => {
    mergeBoardData.id &&
      dispatch(
        patchBoardMergeInit({
          id: mergeBoardData.id,
          data: { id: targetBoard },
          actionList: [{ type: getBoardGroupsInit.type, payload: { id: mergeBoardData.clubId } }]
        })
      );
    submit?.();
    close();
  };

  return (
    <Dialog
      open={!!mergeBoardData}
      onClose={close}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
    >
      <div className="dialog-merge-board">
        <div className={`dialog-merge-board-title`}>{BVD.dialogText.mergeBoard.title}</div>
        <div className={`dialog-merge-board-subtitle`}>{BVD.dialogText.mergeBoard.subtitle}</div>

        <div className="select-wrapper">
          <select onChange={onTargetBoardChange}>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>

        <div className={`jg-dialog-button-wrapper`}>
          <JButton label={'No'} color={'none'} outline onClick={close} />
          <JButton label={'Yes'} onClick={onClickSubmit} />
        </div>
      </div>
    </Dialog>
  );
};

export default MergeBoardDialog;

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
