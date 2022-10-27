import React, { lazy, useEffect, useRef, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hidePopup } from 'redux/store/common/popupSlice';

function Popup() {
  const { isDim, isShow, type } = useSelector((state) => ({ ...state.popup }));
  const CustomComponent = lazy(() => import(`components/common/Popup/${type}`));

  const ref = useRef(null);
  const dispatch = useDispatch();

  const onHide = () => {
    dispatch(hidePopup());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isShow && !isDim) {
        dispatch(hidePopup());
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isShow]);

  return (
    <div style={{ display: isShow ? 'inline-block' : 'none' }} ref={ref}>
      {isDim && <div id="modal" />}
      <Suspense fallback={null}>{type && <CustomComponent onHide={onHide} />}</Suspense>
    </div>
  );
}

export default Popup;
