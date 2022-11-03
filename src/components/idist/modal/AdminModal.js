import React from 'react';
import { isDimmedClick } from 'utils/domUtils';
import 'assets/scss/component/modal.scss';
import { useDispatch } from 'react-redux';
import { forceCloseModal } from 'redux/idistStore/admin/modalSlice';
import JButton from '../admin/JButton';

const pcn = 'jg-modal';

function AdminModal({
  visible,
  title = 'There is no modal name',
  close,
  hideSubmit,
  hideCancel,
  onClickSubmit,
  onClickCancel
}) {
  const dispatch = useDispatch();
  const onClose = () => {
    console.log('close');
    dispatch(forceCloseModal());
  };
  return (
    <ModalLayer isOpen={visible} close={close || onClose}>
      <ModalWrapper>
        {title?.map?.((item, index) => {
          const key = `title${index}`;
          return (
            <div className={`${pcn}-title`} key={key}>
              {item}
            </div>
          );
        }) || <div className={`${pcn}-title`}>{title}</div>}
        <div className={`${pcn}-button-wrapper`}>
          {!hideCancel && <JButton label="No" color="none" outline onClick={onClickCancel || onClose} />}
          {!hideSubmit && <JButton label="Yes" onClick={onClickSubmit} />}
        </div>
      </ModalWrapper>
    </ModalLayer>
  );
}

export default AdminModal;

export function ModalLayer({ isOpen, close, children }) {
  const className = `${pcn}-root`;
  const onClick = (e) => {
    if (isDimmedClick(e, className)) {
      close();
    }
  };

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ display: isOpen ? 'flex' : 'none' }}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick(e) : {})}
      tabIndex={0}
      role="button"
    >
      {children}
    </div>
  );
}

export function ModalWrapper({ children }) {
  return <div className={`${pcn}-wrapper`}>{children}</div>;
}
