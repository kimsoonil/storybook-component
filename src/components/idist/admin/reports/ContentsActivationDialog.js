/* eslint-disable */
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAllDialog, closeDialog } from 'redux/idistStore/admin/dialogSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'assets/scss/component/dialog.scss';
import PropTypes from 'prop-types';
import JButton from '../JButton';

const ContentsActivationDialog = ({ submit }) => {
  const dispatch = useDispatch();
  const contentsActivation = useSelector((state) => state.adminDialog.contentsActivation);

  // const rootClassName = 'contents-activation-dialog'

  const close = () => dispatch(closeDialog('contentsActivation'));

  const reasonList = useMemo(
    () => [
      {
        id: 0,
        title: 'Breaks rules',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 1,
        title: 'Harassment',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 2,
        title: 'Spam',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 3,
        title: 'Hate',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 4,
        title: 'Threatening violence',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 5,
        title: 'Prohibited transaction',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 6,
        title: 'Sharing personal information',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 7,
        title: 'Impersonation',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 8,
        title: 'Copyright violation',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 9,
        title: 'Misinformation',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 10,
        title: 'Sexualization of minors',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 11,
        title: 'Harassment',
        description: `Posts, comments, or behavior
    that breaksr/mildlyinfuriating community rules.`
      },
      {
        id: 12,
        title: 'Etc'
      }
    ],
    []
  );
  const [reason, setReason] = useState(reasonList[0]);
  const [additionalText, setAdditionalText] = useState('');

  const onClickReasonButton = (data) => setReason(data);
  return (
    <Dialog
      open={contentsActivation}
      onClose={close}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
    >
      <div className="contents-activation">
        <img className="exit-image" onClick={close} src={require('images/admin/icon-x.svg').default} />
        <div className="contents-activation-title">Disactivate the post/review</div>

        <div className="contents-activation-description">
          If you select a reason for deactivation, the selected reason will be sent to the member along with the
          deactivation.
        </div>

        <div className="contents-activation-reason-wrapper">
          {reasonList.map((reasonItem) => (
            <ReasonButton
              key={reasonItem.id}
              reasonItem={reasonItem}
              selected={reason.id === reasonItem.id}
              onClick={onClickReasonButton}
            />
          ))}
        </div>
        {reason.id !== 12 && (
          <div className="contents-activation-reason-explain">
            <div className="contents-activation-reason-explain-title">{reason.title}</div>
            <div className="contents-activation-reason-explain-description">{reason.description}</div>
          </div>
        )}

        <div className="contents-activation-additional-wrapper">
          <div className="contents-activation-additional-title">Additional</div>
          <div className="contents-activation-additional-textarea-layout">
            <textarea
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              className="contents-activation-additional-textarea"
              placeholder="If you have more to say, please write here."
              maxLength={200}
            />
          </div>
        </div>

        <div className={`contents-activation-button-wrapper`}>
          <JButton width={200} label={'Cancel'} color={'none'} onClick={close} />
          <JButton width={200} label={'Confirm'} onClick={close} disabled={reason.id === 12 && !additionalText} />
        </div>
      </div>
    </Dialog>
  );
};

export default ContentsActivationDialog;

const ReasonButton = ({ reasonItem, onClick, selected }) => {
  const selectedClassName = selected ? 'contents-activation-reason-button-selected' : '';
  return (
    <div className={`contents-activation-reason-button ${selectedClassName}`} onClick={() => onClick(reasonItem)}>
      {reasonItem.title}
      {/* <div className="contents-activation-reason-text">{}</div> */}
    </div>
  );
};
