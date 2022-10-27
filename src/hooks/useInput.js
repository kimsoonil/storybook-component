import React, { useState } from 'react';

const useInput = ({ initialValue = '', onChange, validator, maxLength }) => {
  const [value, setValue] = useState(initialValue);

  const _onChange = (event) => {
    const {
      target: { value }
    } = event;

    let valid = true;
    if (typeof validator === 'function') {
      valid = validator(value);
    }
    if (valid && maxLength && typeof maxLength === 'number') {
      valid = value.length <= maxLength;
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }

    valid && setValue(value);
  };

  const reset = () => {
    setValue('');
  };

  const init = (_value) => {
    setValue(_value);
  };

  return { props: { value, onChange: _onChange }, reset, init };
};

export default useInput;
