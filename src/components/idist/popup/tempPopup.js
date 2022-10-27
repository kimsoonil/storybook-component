/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function TempPopup(props) {
  const navigate = useNavigate();
  const tempChange = (tempItem) => {
    if (
      confirm(
        'When you load a temporary text, the writing\nyou are creating disappears. Are you sure\nyou want to load the selected text?'
      )
    ) {
      navigate(`../writing/${tempItem.id}`);
    }
  };
  const allDetele = () => {
    if (confirm('Are you sure you want to delete all temporary posts?')) {
      props.tempAllDetele();
      props.setOpen(!props.open);
    }
  };
  const selectDetele = (id) => {
    if (confirm('Are you sure you want to delete the selected draft?')) {
      props.tempSelectDetele(id);
      props.setOpen(!props.open);
    }
  };
  return (
    <div className="temp-popup" style={{ display: props.open ? 'block' : 'none' }}>
      <div className="flex-between temp-header">
        <div className="temp-popup-title">Save as draft {props.posts?.data?.length || 0}</div>
        <div className="temp-popup-close" onClick={() => props.setOpen(!props.open)}>
          X
        </div>
      </div>
      <div className="temp-body">
        <div className="flex-between ">
          <div className="temp-content">
            Up to 300 temporary registration
            <br /> posts are stored in 60 days.
          </div>
          <div className="temp-delete" onClick={() => allDetele()}>
            Delete All
          </div>
        </div>
        <div className="temp-lsit">
          {props.posts?.data?.map((tempItem, index) => {
            return (
              <div className="temp-lsit-item flex-between" key={index}>
                <div className="temp-lsit-item-title" onClick={() => tempChange(tempItem)}>
                  {tempItem.title === '' ? 'Untitled' : tempItem.title}
                </div>
                <div className="temp-lsit-item-actions flex-center">
                  <div className="temp-lsit-item-date">{dayjs(tempItem.created).format('YYYY.MM.DD')}</div>
                  <div className="temp-lsit-item-delete" onClick={() => selectDetele(tempItem.id)}>
                    <img src={require('images/club/ic-trash.png')} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TempPopup;
