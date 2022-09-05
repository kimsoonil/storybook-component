/* eslint-disable */

import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

import ToggleBtn from 'components/ToggleBtn';
import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function Board(props) {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false,
    height: 600,
    placeholder: 'Please leave a comment that you want to share.'
  };
  return (
    <div className="club-home container">
      <div className="item">
        <div className="board">
          <div className="board-title">Writing</div>
          <div className="board-input">
            <input placeholder="Please enter a title" />
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <div className="borad-tag">
            <div className="tag">#</div>
          </div>
          <div className="board-allow">
            <div>
              Allow Comments
              <ToggleBtn />
            </div>
            <div>
              Allow Sharing
              <ToggleBtn />
            </div>
            <div>
              Allow Search
              <ToggleBtn />
            </div>
            <div>
              Register as a Notice
              <ToggleBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <img src={require('images/club/chat-long.png')} alt="" />
      </div>
    </div>
  );
}

export default Board;
