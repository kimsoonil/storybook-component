import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Dialog } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import { BVD } from 'views/Admin/Boards';
import { patchBoardGroupMergeInit } from 'redux/idistStore/boardGroupSlice';
import { getBoardGroupsInit } from 'redux/idistStore/admin/boardAdminSlice';
import JButton from '../JButton';

function MergeGroupDialog({ submit }) {
  const dispatch = useDispatch();
  const mergeGroupData = useSelector((state) => state.adminDialog.mergeGroup);
  const boardGroups = useMemo(() => mergeGroupData?.boardGroups || [], [mergeGroupData?.boardGroups]);

  const [targetBoardGroup, setTargetBoardGroup] = useState(null);
  const onTargetBoardGroupChange = useCallback((e) => {
    setTargetBoardGroup(e.target.value);
  }, []);

  useEffect(() => {
    if (boardGroups.length > 0) {
      setTargetBoardGroup(boardGroups[0]?.id);
    } else {
      setTargetBoardGroup(null);
    }
  }, [boardGroups]);

  const close = () => {
    dispatch(closeDialog('mergeGroup'));
  };
  const onClickSubmit = () => {
    if (mergeGroupData.id) {
      dispatch(
        patchBoardGroupMergeInit({
          id: mergeGroupData.id,
          data: { id: targetBoardGroup },
          actionList: [{ type: getBoardGroupsInit.type, payload: { id: mergeGroupData.clubId } }]
        })
      );
    }
    submit?.();
    close();
  };

  return (
    <Dialog
      open={!!mergeGroupData}
      onClose={close}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
    >
      <div className="dialog-merge-board">
        <div className="dialog-merge-board-title">{BVD.dialogText.mergeGroup.title}</div>
        <div className="dialog-merge-board-subtitle">{BVD.dialogText.mergeGroup.subtitle}</div>

        <div className="select-wrapper">
          <select onChange={onTargetBoardGroupChange}>
            {boardGroups.map((board) => (
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

export default MergeGroupDialog;
