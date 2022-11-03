import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Dialog } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import { BVD } from 'views/Admin/Boards';
import { patchBoardMergeInit } from 'redux/idistStore/boardSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import JButton from '../JButton';

function MergeBoardDialog({ submit }) {
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
    if (mergeBoardData.id) {
      dispatch(
        patchBoardMergeInit({
          id: mergeBoardData.id,
          data: { id: targetBoard },
          actionList: [{ type: getBoardGroupsInit.type, payload: { id: mergeBoardData.clubId } }]
        })
      );
    }
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
        <div className="dialog-merge-board-title">{BVD.dialogText.mergeBoard.title}</div>
        <div className="dialog-merge-board-subtitle">{BVD.dialogText.mergeBoard.subtitle}</div>

        <div className="select-wrapper">
          <select onChange={onTargetBoardChange}>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>

        <div className="jg-dialog-button-wrapper">
          <JButton label="No" color="none" outline onClick={close} />
          <JButton label="Yes" onClick={onClickSubmit} />
        </div>
      </div>
    </Dialog>
  );
}

export default MergeBoardDialog;
