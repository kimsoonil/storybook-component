import React, { useState } from 'react';

const useInput = (initialValue, extraOnChange, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value }
    } = event;

    let valid = true;
    if (typeof validator === 'function') {
      valid = validator(value);
    }
    valid && setValue(value);

    if (typeof extraOnChange === 'function') {
      extraOnChange();
    }
  };

  const reset = () => {
    setValue('');
  };

  const init = () => {
    setValue(initialValue);
  };

  return { props: { value, onChange }, reset, init };
};

export default useInput;
