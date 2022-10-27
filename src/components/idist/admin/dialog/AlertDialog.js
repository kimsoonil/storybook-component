/* eslint-disable */
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllDialog, closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import PropTypes from 'prop-types';
import JButton from '../JButton';

const AlertDialog = ({ type, open, title, submit, cancel, preventCloseOnSubmit }) => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeDialog(type));
  };
  const onClickSubmit = () => {
    submit?.();
    !preventCloseOnSubmit && close();
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
        {title?.map?.((item, index) => (
          <div className={`jg-dialog-title`} key={index}>
            {item}
          </div>
        )) || <div className={`jg-dialog-title`}>{title}</div>}

        <div className={`jg-dialog-button-wrapper`}>
          <JButton label={'No'} color={'none'} outline onClick={onClickCancel} />
          <JButton label={'Yes'} onClick={onClickSubmit} />
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  submit: PropTypes.func,
  cancel: PropTypes.func,
  preventCloseOnSubmit: PropTypes.bool
};

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
