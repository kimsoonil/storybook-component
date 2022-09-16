/* eslint-disable */

import React from 'react';

import 'assets/scss/components.scss';
import 'assets/scss/reset.scss';

function BorardList(props) {
  return (
    <div className="borard-card">
      {props.DataList.map((item, index) => {
        return (
          <div className="borard-card-item relative" key={index}>
            <div className="borard-card-img ">
              <img src={require(`images/home/${item.img}`)} alt="" />
            </div>
            <div className="borard-card-item-container">
              <div className="borard-card-item-nick">{item.nickname}</div>
              <div className="borard-card-item-title">{item.title}</div>
              <div className="borard-card-item-content">{item.content}</div>
              <div className="borard-card-item-info">
                View {item.view} ・ Comment {item.comment} {item.data}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BorardList;
