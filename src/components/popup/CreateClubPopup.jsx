import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeCreateClubPopup } from 'redux/store/popupSlice';
import { PopupWrapper, PopupLayer } from 'components/popup/PopupLayer';
import JButton from 'components/admin/JButton';
import { navigate } from '@storybook/addon-links';

// export enum LEAVE_ALERT_TYPE {
//     TEST_POPUP = 'TEST_POPUP',
// }

export const CreateClubPopup = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**
   * visible: boolean
   * type: 'create', 'cancel'
   * text: ''
   */
  const popup = useSelector((state) => state.popup.createClubPopup);
  const onCancel = () => {
    dispatch(closeCreateClubPopup());
  };
  const onApply = () => {
    dispatch(closeCreateClubPopup());
    if (popup.type === 'create') {
      navigate('/dashboard');
    } else {
      navigate(-1);
    }
  };

  return (
    <PopupLayer isOpen={popup.visible} close={onCancel}>
      <PopupWrapper>
        <div className="create-club-popup">
          <div className="create-club-popup-title">{popup.text}</div>
          <div className="create-club-popup-button-wrapper">
            <JButton color={'none'} outline label={'No'} onClick={onCancel} />
            <JButton label={'Yes'} onClick={onApply} />
          </div>
        </div>
      </PopupWrapper>
    </PopupLayer>
  );
};

// import React from 'react'
// import ReactDom from 'react-dom';

// const PopupDom = ({ children }) => {
//     const el = document.getElementById('popupDom');
//     return ReactDom.createPortal(children, el);
// };

// export default PopupDom;