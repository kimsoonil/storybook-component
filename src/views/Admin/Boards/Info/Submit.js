import JButton from 'components/idist/admin/JButton';
import React from 'react';

const Submit = ({
  isDefault = false,
  onClickCancel = () => {},
  cancelDisabled = true,
  onClickDelete = () => {},
  onClickSave = () => {},
  saveDisabled = true
}) => {
  return (
    <div className="submit-button-wrapper">
      <JButton label="Cancel" outline color="none" onClick={onClickCancel} tabIndex={0} disabled={cancelDisabled} />
      {!isDefault && <JButton label="Delete" color="none" onClick={onClickDelete} tabIndex={0} />}
      <JButton label="Save" color="primary" onClick={onClickSave} tabIndex={0} disabled={saveDisabled} />
    </div>
  );
};

export default Submit;
