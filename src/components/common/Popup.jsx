import React, { useEffect, useRef } from 'react';
import './popup.css';
import { useSelector, useDispatch } from 'react-redux';
import { hidePopup } from 'redux/store/popupSlice';

function Popup() {
  const { isShow, title, contents, buttonName } = useSelector((state) => ({ ...state.popup }));
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(hidePopup());
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="popup" style={{ visibility: isShow ? 'visible' : 'hidden' }}>
      <div className="popup_open" ref={ref}>
        <h3>{title}</h3>
        <div style={{ width: '40%', height: '40vh' }}>
          <button onClick={() => dispatch(hidePopup())}>X</button>
        </div>
        <h3>{contents}</h3>
        <div>
          <button onClick={() => dispatch(hidePopup())}>Cancel</button>
          <button onClick={() => dispatch(hidePopup())}>{buttonName}</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
