import React, { useMemo } from 'react';

import selectArrowCloseWhite from 'images/admin/ic-select-arrow-close-white.svg';
import selectArrowOpenFocus from 'images/admin/ic-select-arrow-open-focus.svg';
import selectArrowCloseFocus from 'images/admin/ic-select-arrow-close-focus.svg';
import selectArrowClose from 'images/admin/ic-select-arrow-close.svg';
import JSelect from '../JSelect';

function DropdownIndicator({ selectProps, isFocused, isDisabled }) {
  const isOpen = useMemo(() => selectProps.menuIsOpen, [selectProps.menuIsOpen]);
  const imageSource = useMemo(() => {
    if (isDisabled) {
      return selectArrowCloseWhite;
    }
    if (isOpen) {
      return selectArrowOpenFocus;
    }
    if (isFocused) {
      return selectArrowCloseFocus;
    }
    return selectArrowClose;
  }, [isDisabled, isOpen, isFocused]);

  return (
    <div className={`${selectProps.classNamePrefix}__indicators`}>
      <img src={imageSource} alt="indicator" />
    </div>
  );
}

function PermissionSelector({ options, selectedOption, setSelectedOption, isDisabled }) {
  const styles = {
    control: (provided, { selectProps, menuIsOpen, isDisabled: disabled }) => ({
      ...provided,
      ...(selectProps?.width && { width: `${selectProps.width}px` }),
      height: '44px',
      padding: '8px !important',
      borderRadius: '4px !important',
      ...(menuIsOpen
        ? {
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important'
          }
        : {}),
      ...(disabled ? { backgroundColor: '#CDCDD1 !important' } : {})
    }),
    menu: (provided, { selectProps }) => ({
      ...provided,
      ...(selectProps?.width && { width: `${selectProps.width}px`, maxHeight: '220px' }),
      borderBottomLeftRadius: '4px !important',
      borderBottomRightRadius: '4px !important'
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      padding: '0 12px !important'
    }),
    singleValue: (provided, { isDisabled: disabled }) => ({
      ...provided,
      ...(disabled ? { color: 'white !important' } : {})
    })
  };

  return (
    <JSelect
      options={options}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      isDisabled={isDisabled}
      width={150}
      styles={styles}
      components={{ DropdownIndicator }}
    />
  );
}

export default PermissionSelector;
