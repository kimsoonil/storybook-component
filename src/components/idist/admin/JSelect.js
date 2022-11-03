/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useRef } from 'react';
import Select from 'react-select';
import 'assets/scss/component/jselect.scss';

import selectArrowClose from 'images/admin/ic-select-arrow-close.svg';
import selectArrowOpenFocus from 'images/admin/ic-select-arrow-open-focus.svg';
import selectArrowCloseFocus from 'images/admin/ic-select-arrow-close-focus.svg';

function DropdownIndicator({ selectProps, isFocused, isDisabled }) {
  const isOpen = useMemo(() => selectProps.menuIsOpen, [selectProps.menuIsOpen]);
  const imageSource = useMemo(() => {
    if (isDisabled) {
      return selectArrowClose;
    }
    if (isOpen) {
      return selectArrowOpenFocus;
    }
    if (isFocused) {
      return selectArrowCloseFocus;
    }
    return selectArrowClose;
  }, [isDisabled, isOpen, isFocused]);

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
      <img src={imageSource} alt="indicator" />
    </div>
  );
}

/**
 *
 * @param {*} param0
 * @returns
 * options = [{ value: '', label: ''}]
 *
 * selectedOption = state
 * setSelectedOption = setState
 *
 * styles = { [component] : (provided, state) => ({}), }
 * styles = {
 *   option: (provided, state) => ({
 *     ...provided,
 *     color: state.isSelected ? 'red' : 'blue'
 *   }),
 *   control: (provided, state) => ({ ...provided }),
 *   dropdownIndicator: (provided, state) => ({ ...provided }),
 *   indicatorsContainer: (provided, state) => ({ ...provided }),
 *   indicatorSeparator: (provided, state) => ({ ...provided })
 * }
 */

function JSelect({
  forwardedRef,
  options,
  selectedOption,
  setSelectedOption,
  placeholder = '',
  width,
  inputState,
  styles,
  onFocus,
  onBlur,
  isDisabled,
  defaultValue,
  components,
  ...props
}) {
  const ref = useRef();
  const selectRef = forwardedRef || ref;

  const newStyles = {
    control:
      styles?.control ||
      ((provided, { selectProps, menuIsOpen }) => ({
        ...provided,
        ...(selectProps?.width && { width: `${selectProps.width}px` }),
        ...(!menuIsOpen && selectProps?.inputState === 'error' && { border: '1px solid #ff2a55 !important' }),
        ...(!menuIsOpen && selectProps?.inputState === 'success' && { border: '1px solid #00b78b !important' })
      })),
    menu: styles?.menu || ((provided) => ({ ...provided, ...(width && { width: `${width}px` }) })),
    ...styles
  };

  return (
    <div className="react-select-container">
      <Select
        isDisabled={isDisabled}
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        defaultValue={defaultValue || selectedOption}
        value={selectedOption}
        onChange={setSelectedOption}
        width={width}
        inputState={inputState}
        placeholder={placeholder}
        onMenuOpen={() => {
          selectRef.current.scrollToFocusedOptionOnUpdate = true;
          selectRef.current.setState({
            focusedOption: options.find((option) => option.value === selectedOption?.value)
          });
        }}
        styles={newStyles}
        // styles={{
        //   control: (provided, { isDisabled,  }) => {
        //     console.log(isDisabled);
        //     return { ...provided };
        //   },
        //   singleValue
        // }}
        components={{ DropdownIndicator, ...components }}
        // maxMenuHeight={40}

        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef((props, ref) => <JSelect {...props} forwardedRef={ref} />);
