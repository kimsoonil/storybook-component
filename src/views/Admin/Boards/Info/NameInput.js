import React, { useEffect, useRef, useState } from 'react';

import { BVD } from '../index';
import { IVD } from 'views/Admin';
import 'assets/scss/admin/boards.scss';
import useInput from 'hooks/useInput';

const NameInput = ({ name, onChange, onFocus, onBlur, inputState, disabled }) => {
  const disabledClassName = disabled ? 'disabled' : 'none';

  return (
    <div className="boards-contents-name">
      <div className="name-wrapper">
        <div className={`info-title info-title-${disabledClassName} `}>{BVD.name.title}</div>
        <div className="essential" />
      </div>
      <div className={`name-input-wrapper name-input-wrapper-${inputState} name-input-wrapper-${disabledClassName}`}>
        <input
          id="admin-board-info-name-input"
          value={name}
          onChange={onChange}
          className={`itxt-placeholder input-${disabledClassName}`}
          type={'text'}
          placeholder={BVD.name.placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
        />
        <div className="name-length">
          <div className="name-length-gray">{name?.length}</div>/20
        </div>
      </div>
      <div className="name-error-wrapper">
        {inputState === IVD.error && <div className="name-error">{BVD.name.error}</div>}
      </div>
    </div>
  );
};

export default NameInput;
