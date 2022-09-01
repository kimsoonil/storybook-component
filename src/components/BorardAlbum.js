/* eslint-disable */

import React from 'react';

import 'assets/scss/components.scss';
import 'assets/scss/reset.scss';

function BorardAlbum(props) {
  return (
    <div className="borard-album">
      {props.DataList.map((item, index) => {
        return (
          <div className="borard-album-item relative" key={index}>
            <div className="borard-album-img ">
              <img src={require(`images/home/${item.img}`)} alt="" />
            </div>
            <div className="borard-album-item-container">
              <div className="borard-album-item-nick">{item.nickname}</div>
              <div className="borard-album-item-title">{item.title}</div>
              <div className="borard-album-item-info">
                View {item.view} ・ Comment {item.comment} {item.data}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BorardAlbum;
