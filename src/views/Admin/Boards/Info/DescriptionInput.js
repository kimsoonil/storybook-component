import React, { useEffect, useRef, useState } from 'react';

import { BVD } from '../index';
import { IVD } from 'views/Admin';
import 'assets/scss/admin/boards.scss';
import useInput from 'hooks/useInput';

const DescriptionInput = ({ description, onChange: _onChange }) => {
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    if (value.length <= 160) {
      _onChange(value);
    }
  };

  return (
    <div className="boards-contents-description">
      <div className="info-title">{BVD.description.title}</div>
      <div className="desc-input-wrapper">
        <textarea
          className="itxt-placeholder"
          placeholder={BVD.description.placeholder}
          value={description}
          onChange={onChange}
          maxLength={160}
        />
        <div className="desc-length">
          <div className="desc-length-gray">{description?.length}</div>/160
        </div>
      </div>
    </div>
  );
};

export default DescriptionInput;
