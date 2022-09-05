import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'assets/scss/component/select.scss';

const Select = ({ selectedValue, setSelectedValue, state, options = [], placeholder = '', onBlur = () => {} }) => {
  const selectRef = useRef();
  const selectScrollRef = useRef();

  const [isExtended, setExtended] = useState(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const itemHeight = 48;
  const maxHeight = 220;
  const entryCount = Math.floor(maxHeight / itemHeight) - 1;

  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    if (isExtended) {
      setCurrentPosition(currentOptionIndex);
      scroll(currentOptionIndex * itemHeight);
    }
  }, [isExtended]);

  const onClickSelect = () => {
    setExtended((prev) => !prev);
  };
  const onFocus = () => {
    setFocused(true);
  };
  const _onBlur = () => {
    onClose({ applyed: false });
    setFocused(false);
    onBlur();
  };
  const onKeyDown = (e) => {
    // 엔터 키
    if (e.key === 'Enter') {
      if (isExtended) {
        onClose({ index: currentOptionIndex, applyed: true });
      } else {
        setExtended(true);
      }

      // 위 방향키
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isExtended) {
        if (currentOptionIndex === 0) {
          //제일 아래로 내리기
          setCurrentPosition(options.length - 1 - entryCount);
          scroll(options.length * itemHeight);
        } else if (currentPosition >= currentOptionIndex) {
          const _nextPosition = currentPosition - 1;
          setCurrentPosition(_nextPosition);
          scroll(_nextPosition * itemHeight);
        }
        setCurrentOptionIndex((prev) => (prev < 1 ? options.length - 1 : prev - 1)); // loop
      }

      // 아래 방향키
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isExtended) {
        setExtended(true);
      } else {
        if (currentOptionIndex === options.length - 1) {
          setCurrentPosition(0);
          scroll(0);
        } else if (currentOptionIndex - entryCount >= currentPosition) {
          const _nextPosition = currentPosition + 1;
          setCurrentPosition(_nextPosition);
          scroll(_nextPosition * itemHeight);
        }
        setCurrentOptionIndex((prev) => (prev >= options.length - 1 ? 0 : prev + 1)); // loop
      }

      // Esc 키
    } else if (e.key === 'Escape') {
      onClose({ applyed: false });
    }
  };

  const scroll = (position) => {
    selectScrollRef.current.scrollTo({
      top: position,
      left: 0
    });
  };

  const onClose = ({ index, applyed }) => {
    setExtended(false);
    if (applyed) {
      setSelectedValue(options[index]);
      setCurrentOptionIndex(index);
    } else {
      if (selectedValue) {
        setCurrentOptionIndex(options.findIndex((value) => value === selectedValue));
      } else {
        setCurrentOptionIndex(0);
      }
    }
  };

  return (
    <div
      tabIndex={0}
      ref={selectRef}
      className={[
        'select-wrapper',
        ...(isExtended ? ['select-wrapper-extended'] : []),
        ...(!isExtended && selectedValue ? ['select-wrapper-success'] : []),
        ...(state === 'error' ? ['select-wrapper-error'] : [])
      ].join(' ')}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onBlur={_onBlur}
    >
      <div className="selected" onMouseDown={onClickSelect}>
        <div className={`selected-value ${selectedValue || `selected-default`}`}>{selectedValue || placeholder}</div>
        {isExtended ? (
          <img src={require('images/admin/ic-select-arrow-close-on.svg').default} />
        ) : !selectedValue ? (
          <img src={require('images/admin/ic-select-arrow-open.svg').default} />
        ) : isFocused ? (
          <img src={require('images/admin/ic-select-arrow-open-on.svg').default} />
        ) : (
          <img src={require('images/admin/ic-select-arrow-open-on-success.svg').default} />
        )}
      </div>

      {isExtended && (
        <div className={`option-list  ${isExtended && 'option-list-extended'}`} ref={selectScrollRef}>
          {options.map((item, index) => (
            <div
              onChange={(e) => {
                console.log(e);
              }}
              key={index}
              className={`option-item ${index === currentOptionIndex && 'option-current'}`}
              // className={`option-item option-current`}
              onClick={() => {
                onClose({ index, applyed: true });
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
