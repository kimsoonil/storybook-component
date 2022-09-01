/* eslint-disable */

import React from 'react';

import 'assets/scss/components.scss';
import 'assets/scss/reset.scss';

function BorardList(props) {
  return (
    <div className="borard-list">
      {props.DataList.map((item, index) => {
        return (
          <div className="borard-list-item relative" key={index}>
            <div className="borard-list-item-container">
              <div className="borard-list-item-nick">{item.nickname}</div>
              <div className="borard-list-item-title">{item.title}</div>
              <div className="borard-list-item-content">{item.content}</div>
              <div className="borard-list-item-info">
                View {item.view} ・ Comment {item.comment} {item.data}
              </div>
            </div>
            <div className="borard-list-img ">
              <img src={require(`images/home/${item.img}`)} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BorardList;
