import React from 'react';
import { isDimmedClick } from 'utils/domUtils';
import 'assets/scss/component/modal.scss';
import { useDispatch } from 'react-redux';
import JButton from '../admin/JButton';
import { forceCloseModal } from 'redux/idistStore/admin/modalSlice';

const pcn = 'jg-modal';

const AdminModal = ({
  visible,
  title = 'There is no modal name',
  close,
  hideSubmit,
  hideCancel,
  onClickSubmit,
  onClickCancel
}) => {
  const dispatch = useDispatch();
  const _close = () => {
    console.log('close');
    dispatch(forceCloseModal());
  };
  return (
    <ModalLayer isOpen={visible} close={close || _close}>
      <ModalWrapper>
        {title?.map?.((item, index) => (
          <div className={`${pcn}-title`} key={index}>
            {item}
          </div>
        )) || <div className={`${pcn}-title`}>{title}</div>}
        <div className={`${pcn}-button-wrapper`}>
          {!hideCancel && <JButton label={'No'} color={'none'} outline onClick={onClickCancel || _close} />}
          {!hideSubmit && <JButton label={'Yes'} onClick={onClickSubmit} />}
        </div>
      </ModalWrapper>
    </ModalLayer>
  );
};

export default AdminModal;

export const ModalLayer = ({ isOpen, close, children }) => {
  const className = `${pcn}-root`;
  const onClick = (e) => {
    if (isDimmedClick(e, className)) {
      close();
    }
  };

  return (
    <div className={className} onClick={onClick} style={{ display: isOpen ? 'flex' : 'none' }}>
      {children}
    </div>
  );
};

export const ModalWrapper = ({ children }) => {
  return <div className={`${pcn}-wrapper`}>{children}</div>;
};
