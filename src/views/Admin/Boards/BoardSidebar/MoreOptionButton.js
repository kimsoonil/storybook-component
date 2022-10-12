import React, { useMemo, useRef } from 'react';
import 'assets/scss/admin/boards.scss';
import useDetectClose from 'hooks/useDetectClose';

const MoreOptionButton = ({ onClick, onClickOutside, menuList = [] }) => {
  const dropDownButtonRef = useRef(null);
  const [isOpen, setOpen] = useDetectClose(dropDownButtonRef, false, onClickOutside);
  const selectedClassName = useMemo(() => (isOpen ? 'selected' : 'none'), [isOpen]);

  const stopPropagation = (e) => e?.stopPropagation();
  const onClickMore = (e) => {
    onClick();
    setOpen((prev) => !prev);
  };

  return (
    <div className={`hover-option hover-option-${selectedClassName}`} onClick={stopPropagation}>
      <div className="hover-option-button" onClick={onClickMore} ref={dropDownButtonRef}>
        <img src={require('images/admin/board/more-hor.svg').default} />
      </div>

      <div className={`drop-down drop-down-${selectedClassName}`}>
        {menuList?.map((item, index) => {
          const onClickOption = () => {
            setOpen(false);
            item.onClick();
          };

          return (
            <div key={index} className={'drop-down-item'} onClick={onClickOption}>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreOptionButton;
