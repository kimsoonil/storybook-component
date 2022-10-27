/* eslint-disable */
import React, { useMemo } from 'react';
import { IVD } from 'views/Admin';
import JSelect from '../JSelect';

const PermissionSelector = ({ options, selectedOption, setSelectedOption, isDisabled, ...props }) => {
  const styles = {
    control: (provided, { selectProps, menuIsOpen, isDisabled }) => {
      return {
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
        ...(isDisabled ? { backgroundColor: '#CDCDD1 !important' } : {})
      };
    },
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
    singleValue: (provided, { isDisabled }) => ({
      ...provided,
      ...(isDisabled ? { color: 'white !important' } : {})
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
      {...props}
    />
  );
};

export default PermissionSelector;

const DropdownIndicator = ({ selectProps, isFocused, isDisabled, hasValue, inputState = IVD.none, ...props }) => {
  const isOpen = useMemo(() => selectProps.menuIsOpen, [selectProps.menuIsOpen]);
  const imageSource = useMemo(
    () =>
      isDisabled
        ? require('images/admin/ic-select-arrow-close-white.svg').default
        : isOpen
        ? require('images/admin/ic-select-arrow-open-focus.svg').default
        : isFocused
        ? require('images/admin/ic-select-arrow-close-focus.svg').default
        : require('images/admin/ic-select-arrow-close.svg').default,
    [isDisabled, isOpen, isFocused]
  );
  // const imageSource = useMemo(
  //   () =>
  //     isDisabled
  //       ? require('images/admin/ic-select-arrow-close.svg').default
  //       : isOpen
  //       ? require('images/admin/ic-select-arrow-open-focus.svg').default
  //       : isFocused
  //       ? require('images/admin/ic-select-arrow-close-focus.svg').default
  //       : inputState === IVD.success
  //       ? require('images/admin/ic-select-arrow-close-success.svg').default
  //       : require('images/admin/ic-select-arrow-close.svg').default,
  //   [isDisabled, isOpen, isFocused, inputState]
  // );

  return (
    <div className={`${selectProps.classNamePrefix}__indicators`}>
      <img src={imageSource} />
    </div>
  );
};
