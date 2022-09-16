import React, { useState } from 'react';

import { BVD } from './index';
import { IVD } from 'views/Admin';
import 'assets/scss/admin/boards.scss';
import useInput from 'hooks/useInput';

const Name = ({ initValue = 'test' }) => {
  const validateName = () => {
    if (name.value === '') {
      setInputState(IVD.error);
    } else {
      setInputState(IVD.success);
    }
  };
  const name = useInput(initValue, validateName);
  const [inputState, setInputState] = useState(IVD.blur);

  return (
    <div className="boards-contents-name">
      <div className="name-wrapper">
        <div className="info-title">{BVD.name.title}</div>
        <div className="essential" />
      </div>
      <div className={`name-input-wrapper name-input-wrapper-${inputState}`}>
        <input
          className="itxt-placeholder"
          type={'text'}
          placeholder={BVD.name.placeholder}
          {...name.props}
          maxLength={20}
          onFocus={() => {
            setInputState(IVD.focus);
          }}
        />
        <div className="name-length">
          <div className="name-length-gray">{name.value?.length}</div>/20
        </div>
      </div>
      {inputState === IVD.error && <div className="name-error">{BVD.name.error}</div>}
    </div>
  );
};

export default Name;
