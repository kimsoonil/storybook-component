import React, { useMemo, useRef } from 'react';
import Select from 'react-select';
import 'assets/scss/component/jselect.scss';
import { IVD } from '../../../views/Admin';

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

const JSelect = ({
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
  ...props
}) => {
  const _ref = useRef();
  const selectRef = forwardedRef || _ref;

  const _styles = {
    control:
      styles?.control ||
      ((provided, { selectProps, menuIsOpen }) => {
        return {
          ...provided,
          ...(selectProps?.width && { width: `${selectProps.width}px` }),
          ...(!menuIsOpen && selectProps?.inputState === 'error' && { border: '1px solid #ff2a55 !important' }),
          ...(!menuIsOpen && selectProps?.inputState === 'success' && { border: '1px solid #00b78b !important' })
        };
      }),
    menu: styles?.menu || ((provided, state) => ({ ...provided, ...(width && { width: `${width}px` }) }))
  };

  return (
    <div className="react-select-container">
      <Select
        ref={selectRef}
        classNamePrefix={'react-select'}
        options={options}
        defaultValue={selectedOption}
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
        styles={_styles}
        components={{ DropdownIndicator }}
        // maxMenuHeight={40}

        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </div>
  );
};

const DropdownIndicator = ({ selectProps, isFocused, isDisabled, hasValue, inputState = IVD.none, ...props }) => {
  const isOpen = useMemo(() => selectProps.menuIsOpen, [selectProps.menuIsOpen]);
  const imageSource = useMemo(
    () =>
      isDisabled
        ? require('images/admin/ic-select-arrow-close.svg').default
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

export default React.forwardRef((props, ref) => <JSelect {...props} forwardedRef={ref} />);

{
  /* 
<div class="react-select-container">
  <div class="react-select__control">
    <div class="react-select__value-container">
      ...
    </div>
    <div class="react-select__indicators">
      ...
    </div>
  </div>
  <div class="react-select__menu">
    <div class="react-select__menu-list">
      <div class="react-select__option">
        ...
      </div>
    </div>
  </div>
</div> */
}
