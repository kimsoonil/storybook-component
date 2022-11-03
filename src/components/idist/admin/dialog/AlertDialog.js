import React from 'react';
import { useDispatch } from 'react-redux';
import { closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Dialog } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import JButton from '../JButton';

function AlertDialog({ type, open, title, submit, cancel, preventCloseOnSubmit }) {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeDialog(type));
  };
  const onClickSubmit = () => {
    submit?.();
    if (!preventCloseOnSubmit) {
      close();
    }
  };

  const onClickCancel = () => {
    cancel?.();
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
    >
      <div>
        {title?.map?.((item, index) => {
          const key = `title${index}`;
          return (
            <div className="jg-dialog-title" key={key}>
              {item}
            </div>
          );
        }) || <div className="jg-dialog-title">{title}</div>}

        <div className="jg-dialog-button-wrapper">
          <JButton label="No" color="none" outline onClick={onClickCancel} />
          <JButton label="Yes" onClick={onClickSubmit} />
        </div>
      </div>
    </Dialog>
  );
}

export default AlertDialog;
