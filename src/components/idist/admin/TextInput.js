/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

import 'assets/scss/component/text-input.scss';

export function TextInput({
  value,
  onChange,
  disabled,
  readOnly,
  onFocus,
  onBlur,
  state,
  lowerCase,
  containerProps,
  ...props
}) {
  // const className = `jg-input ${disabled ? 'disabled' : ''} ${readOnly ? 'read-only' : ''}`;
  // console.log(className);

  // const [isFocused, setFocused] = useState(false);
  const rootName = 'jg-text-input-wrapper';

  return (
    <div className={`${rootName} ${rootName}-${state}`} {...containerProps}>
      <input
        className={`jg-text-input`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {(state === 'success' || state === 'error') && <div className={`mark mark-${state}`} />}
    </div>
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  state: PropTypes.oneOf(['blur', 'focus', 'success', 'error']),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

TextInput.defaultProps = {
  value: '',
  onChange: () => {},
  disabled: false,
  readOnly: false,
  state: 'blur',
  onFocus: () => {},
  onBlur: () => {}
};
