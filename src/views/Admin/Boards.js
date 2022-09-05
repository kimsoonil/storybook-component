import React from 'react';
import 'assets/scss/admin/boards.scss';
import { boardConstants } from 'constants';

const Boards = ({ boardData, save = () => {}, cancel = () => {} }) => {
  console.log('Render Boards');
  return (
    <div className="boards">
      <div className="text-h1 boards-title">{boardConstants.title}</div>
      <div className="text-h4 boards-subtitle">{boardConstants.subTitle}</div>

      <div className="boards-contents-wrapper">
        <div className="boards-menu ">
          <button className="add-group text-h4">{boardConstants.addGroup}</button>
        </div>
        <div className="boards-contents ">
          <></>asdf
        </div>
      </div>
    </div>
  );
};

export default Boards;
